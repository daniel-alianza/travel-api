import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import type { GasolineAnticipoRecord } from '../interfaces/gasoline-disbursement.port';
import type { GasolineDisbursementPort } from '../interfaces/gasoline-disbursement.port';

type ListGasolineAnticiposData = {
  readonly supplier: { readonly code: string; readonly name: string };
  readonly company: { readonly id: number; readonly name: string };
  readonly anticipos: readonly GasolineAnticipoRecord[];
};

export type ListGasolineAnticiposResponse =
  ApiSuccessResponse<ListGasolineAnticiposData>;

@Injectable()
export class ListGasolineAnticiposUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineDisbursementPort')
    private readonly gasolineDisbursementPort: GasolineDisbursementPort,
  ) {}

  async execute(companyId: number): Promise<ListGasolineAnticiposResponse> {
    const company = await this.prismaService.company.findUnique({
      where: { id: companyId },
      select: { id: true, name: true },
    });
    if (company === null) {
      throw new NotFoundException('Empresa no encontrada.');
    }

    const supplier = await this.prismaService.gasolineSupplier.findFirst({
      where: { companyId },
      select: { code: true, name: true },
    });
    if (supplier === null) {
      throw new NotFoundException(
        'No se encontró proveedor de gasolina para la empresa.',
      );
    }

    const anticipos = await this.gasolineDisbursementPort.listAnticipos(
      companyId,
      supplier.code,
      company.name,
    );

    return buildSuccessResponse(
      {
        supplier: { code: supplier.code, name: supplier.name },
        company: { id: company.id, name: company.name },
        anticipos,
      },
      'Anticipos de gasolina consultados correctamente.',
    );
  }
}
