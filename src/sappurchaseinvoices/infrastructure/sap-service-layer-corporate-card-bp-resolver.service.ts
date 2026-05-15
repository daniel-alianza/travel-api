import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { SapAuthAdapter } from '../../infrastructure/SL/sap-auth.adapter';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';
import type {
  SapCorporateCardBusinessPartnerResolver,
  SapCorporateCardResolveResult,
} from '../application/interfaces/sap-corporate-card-business-partner-resolver.interface';

type SapBusinessPartnersResponse = {
  readonly value?: ReadonlyArray<{
    readonly CardCode: string;
    readonly CardName?: string;
    readonly CardForeignName?: string;
  }>;
};

@Injectable()
export class SapServiceLayerCorporateCardBusinessPartnerResolver implements SapCorporateCardBusinessPartnerResolver {
  private readonly logger = new Logger(
    SapServiceLayerCorporateCardBusinessPartnerResolver.name,
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly sapHttpService: SapHttpService,
    private readonly prisma: PrismaService,
  ) {}

  async resolvePurchaseInvoiceCardCode(input: {
    readonly companyId: number;
    readonly corporateCardNumber: string;
    readonly movementMemo: string | null;
  }): Promise<SapCorporateCardResolveResult> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new BadRequestException({
        message: 'SAP_SL_URL no está configurada.',
        error: 'SAP_SL_URL_FALTANTE',
      });
    }

    const candidatosOrdenados = construirCandidatosCardForeignName(
      input.corporateCardNumber,
      input.movementMemo,
    );

    this.logger.log(
      `Card↔SAP: candidatos CardForeignName (orden memo→corporativo, cantidad=${String(candidatosOrdenados.length)}): ${resumirCandidatosParaLog(candidatosOrdenados)}`,
    );

    if (candidatosOrdenados.length === 0) {
      throw new BadRequestException({
        message:
          'No hay número de tarjeta corporativa ni memo de movimiento para cruzar con SAP (alineado a Travel-Expenses V1).',
        error: 'DATOS_TARJETA_MEMO_VACIOS',
      });
    }

    const candidatosConCardEnBd: string[] = [];
    for (const candidato of candidatosOrdenados) {
      const tarjetaLocal = await this.prisma.card.findUnique({
        where: { cardNumber: candidato },
      });
      if (tarjetaLocal !== null) {
        candidatosConCardEnBd.push(candidato);
        this.logger.log(
          `Card↔SAP: candidato existe en tabla Card (cardNumber longitud=${String(candidato.length)}, companyId tarjeta=${tarjetaLocal.companyId === null ? 'null' : String(tarjetaLocal.companyId)})`,
        );
      } else {
        this.logger.log(
          `Card↔SAP: candidato sin fila en Card (se omite para OData), longitud=${String(candidato.length)}`,
        );
      }
    }

    if (candidatosConCardEnBd.length === 0) {
      this.logger.warn(
        `Card↔SAP: ningún candidato coincide con card.cardNumber en BD. Revisar que memo/corporativo estén dados de alta en Card como en V1.`,
      );
      throw new BadRequestException({
        message:
          'Ningún valor de tarjeta/memo coincide con un registro en la tabla local Card (Prisma). En V1 también se exige esta alineación antes del BusinessPartner en SAP.',
        error: 'TARJETA_NO_ENCONTRADA_LOCAL',
      });
    }

    const companyIdsOrdenados = await this.listarCompanyIdsSapOrdenados(
      input.companyId,
    );
    this.logger.log(
      `Card↔SAP: orden de compañías SAP a intentar: ${companyIdsOrdenados.join(', ')}`,
    );

    for (const companyId of companyIdsOrdenados) {
      let sessionId: string | undefined;
      try {
        const login = await this.sapAuthAdapter.login(companyId);
        sessionId = login.SessionId;
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        this.logger.warn(
          `Card↔SAP: login SAP omitido para companyId=${String(companyId)}: ${msg}`,
        );
        continue;
      }

      try {
        for (const tarjeta of candidatosConCardEnBd) {
          this.logger.log(
            `Card↔SAP: OData BusinessPartners companyId=${String(companyId)} CardForeignName len=${String(tarjeta.length)}`,
          );
          const cardCode = await this.buscarCardCodePorTarjeta(
            baseUrl,
            sessionId,
            tarjeta,
          );
          if (cardCode !== null) {
            this.logger.log(
              `Card↔SAP: match OK companyId=${String(companyId)} CardCode=${cardCode}`,
            );
            return { cardCode, sapSessionCompanyId: companyId };
          }
        }
      } finally {
        if (sessionId !== undefined) {
          await this.sapAuthAdapter.logout(sessionId);
        }
      }

      this.logger.warn(
        `Card↔SAP: sin BusinessPartner PRT/PTR para companyId=${String(companyId)} con los candidatos validados en Card.`,
      );
    }

    throw new BadRequestException({
      message:
        'No se encontró en SAP un proveedor de tarjeta (CardCode PRT/PTR) con CardForeignName igual a un valor dado de alta en Card, en ninguna compañía probada. Indica sapCardCode en el cuerpo o revisa Business Partners.',
      error: 'SAP_BP_TARJETA_NO_ENCONTRADO',
    });
  }

  private async buscarCardCodePorTarjeta(
    baseUrl: string,
    sessionId: string,
    cardForeignName: string,
  ): Promise<string | null> {
    const filtro = [
      "(startswith(CardCode,'PRT') or startswith(CardCode,'PTR'))",
      `and CardForeignName eq '${escapeODataString(cardForeignName)}'`,
    ].join(' ');
    const url = `${baseUrl}/BusinessPartners?$filter=${encodeURIComponent(filtro)}&$select=CardCode,CardName,CardForeignName`;
    const response = await this.sapHttpService.get<SapBusinessPartnersResponse>(
      url,
      sessionId,
    );
    const partners = response.value ?? [];
    const primero = partners[0];
    if (primero === undefined || primero.CardCode.trim().length === 0) {
      return null;
    }
    return primero.CardCode.trim();
  }

  private async listarCompanyIdsSapOrdenados(
    primaryCompanyId: number,
  ): Promise<number[]> {
    const filas = await this.prisma.company.findMany({
      select: { id: true },
      orderBy: { id: 'asc' },
    });
    const ids = filas.map((f) => f.id);
    const sinDuplicar: number[] = [primaryCompanyId];
    for (const id of ids) {
      if (id !== primaryCompanyId) {
        sinDuplicar.push(id);
      }
    }
    return sinDuplicar;
  }
}

function construirCandidatosCardForeignName(
  corporateCardNumber: string,
  movementMemo: string | null,
): string[] {
  const lista: string[] = [];
  if (movementMemo !== null) {
    agregarSiDistinto(lista, movementMemo);
    agregarDigitosSiDistinto(lista, movementMemo);
  }
  agregarSiDistinto(lista, corporateCardNumber);
  agregarDigitosSiDistinto(lista, corporateCardNumber);
  return lista;
}

function agregarSiDistinto(lista: string[], valor: string): void {
  const t = valor.trim();
  if (t.length === 0) {
    return;
  }
  if (!lista.includes(t)) {
    lista.push(t);
  }
}

function agregarDigitosSiDistinto(lista: string[], valor: string): void {
  const t = valor.trim();
  const soloDigitos = t.replace(/\D/g, '');
  if (soloDigitos.length > 0 && soloDigitos !== t) {
    agregarSiDistinto(lista, soloDigitos);
  }
}

function resumirCandidatosParaLog(candidatos: readonly string[]): string {
  return candidatos
    .map((c) =>
      c.length > 48 ? `${c.slice(0, 48)}…(${String(c.length)} chars)` : c,
    )
    .join(' | ');
}

function escapeODataString(value: string): string {
  return value.replace(/'/g, "''");
}
