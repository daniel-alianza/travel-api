import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { resolveFuelDistributionRuleName } from '../../domain/gasoline-distribution-rule.resolver';
import type { GasolineDisbursementPort } from '../interfaces/gasoline-disbursement.port';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

export type DisburseGasolineRequestCommand = {
  readonly requestId: number;
  readonly disbursedById: number;
  readonly downPaymentDocEntry: number;
  readonly comment?: string;
};

type DisburseGasolineRequestData = GasolineRequestSummaryRecord & {
  readonly sapDocNum: number;
};

export type DisburseGasolineRequestResponse =
  ApiSuccessResponse<DisburseGasolineRequestData>;

@Injectable()
export class DisburseGasolineRequestUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
    @Inject('GasolineDisbursementPort')
    private readonly gasolineDisbursementPort: GasolineDisbursementPort,
  ) {}

  async execute(
    command: DisburseGasolineRequestCommand,
  ): Promise<DisburseGasolineRequestResponse> {
    const request = await this.gasolineRequestRepository.findForDisbursement(
      command.requestId,
    );
    if (request === null) {
      throw new NotFoundException('Solicitud de gasolina no encontrada.');
    }

    if (request.status !== 'approved') {
      throw new BadRequestException(
        `La solicitud debe estar aprobada para dispersar. Estado actual: ${request.status}.`,
      );
    }

    const disbursedBy = await this.prismaService.user.findUnique({
      where: { id: command.disbursedById },
      select: { id: true },
    });
    if (disbursedBy === null) {
      throw new NotFoundException('Usuario dispersor no encontrado.');
    }

    const supplier = await this.prismaService.gasolineSupplier.findFirst({
      where: { companyId: request.companyId },
      select: { code: true, name: true },
    });
    if (supplier === null) {
      throw new NotFoundException(
        'No se encontró proveedor de gasolina para la empresa.',
      );
    }

    const vat = await this.prismaService.vAT.findFirst({
      where: { companyId: request.companyId, code: { endsWith: '_0' } },
      select: { code: true },
    });
    if (vat === null) {
      throw new NotFoundException(
        'No se encontró código de IVA al 0% para la empresa.',
      );
    }

    const viaticCategory = await this.prismaService.viaticCategory.findFirst({
      where: {
        companyId: request.companyId,
        name: { contains: 'COMBUSTIBLE' },
      },
      select: { code: true },
    });
    if (viaticCategory === null) {
      throw new NotFoundException(
        'No se encontró cuenta mayor de COMBUSTIBLE para la empresa.',
      );
    }

    const costingCode = await this.resolveCostingCode(
      request.companyId,
      request.areaName,
      request.branchName,
    );

    const cardType = request.fuelCardKind ?? '';
    const comments = `${request.cardNumber}\t${cardType}\t${request.plate}\t$${request.requestedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}\tCOMBUSTIBLE`;

    const sapResult = await this.gasolineDisbursementPort.createPurchaseInvoice(
      {
        companyId: request.companyId,
        supplierCode: supplier.code,
        amount: request.requestedAmount,
        comments,
        solicitudRef: `SG. ${request.id} ${request.plate}`,
        taxCode: vat.code,
        accountCode: viaticCategory.code,
        costingCode,
        approverEmail: request.approverEmail,
        approverName: request.approverName,
        downPaymentDocEntry: command.downPaymentDocEntry,
      },
    );

    const updated = await this.gasolineRequestRepository.markDisbursed({
      requestId: command.requestId,
      disbursedById: command.disbursedById,
      comment: command.comment?.trim() ?? null,
    });

    if (updated === null) {
      throw new BadRequestException(
        'No fue posible marcar la solicitud como dispersada.',
      );
    }

    return buildSuccessResponse(
      { ...updated, sapDocNum: sapResult.docNum },
      'Solicitud dispersada y factura de proveedor creada en SAP.',
    );
  }

  private async resolveCostingCode(
    companyId: number,
    areaName: string | null,
    branchName: string | null,
  ): Promise<string | null> {
    if (areaName === null) {
      return null;
    }

    const targetRuleName = resolveFuelDistributionRuleName(
      areaName,
      branchName,
    );

    if (targetRuleName !== null) {
      const rule = await this.prismaService.distributionRule.findFirst({
        where: {
          companyId,
          area: { name: areaName },
          name: targetRuleName,
        },
        select: { code: true },
      });
      if (rule !== null) {
        return rule.code;
      }
    }

    const rulesForArea = await this.prismaService.distributionRule.findMany({
      where: { companyId, area: { name: areaName } },
      select: { code: true },
    });

    if (rulesForArea.length === 1) {
      return rulesForArea[0].code;
    }

    return null;
  }
}
