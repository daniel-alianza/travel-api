import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type { GasolineSapCardsPort } from '../application/interfaces/gasoline-sap-cards.port';

export type ResolveFuelCardInput = {
  readonly companyId: number;
  readonly cardId?: number;
  readonly sapCode?: string;
};

@Injectable()
export class GasolineFuelCardResolverService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineSapCardsPort')
    private readonly gasolineSapCardsPort: GasolineSapCardsPort,
  ) {}

  async resolveCardId(input: ResolveFuelCardInput): Promise<number> {
    if (input.cardId !== undefined) {
      await this.assertActiveFuelCard(input.cardId);
      return input.cardId;
    }

    const sapCode = input.sapCode?.trim();
    if (sapCode === undefined || sapCode.length === 0) {
      throw new BadRequestException(
        'Debes indicar cardId o sapCode de la tarjeta de gasolina.',
      );
    }

    const sapCard = await this.gasolineSapCardsPort.findBySapCode(
      input.companyId,
      sapCode,
    );
    if (sapCard === null) {
      throw new NotFoundException(
        `No se encontró la tarjeta en SAP con código ${sapCode}.`,
      );
    }

    if (!sapCard.isActiveInSap) {
      throw new BadRequestException(
        'La tarjeta de gasolina no está activa en SAP.',
      );
    }

    const existing = await this.prismaService.card.findUnique({
      where: { cardNumber: sapCard.cardNumber },
      select: { id: true, type: true, fuelStatus: true, isActive: true },
    });

    if (existing !== null) {
      if (existing.type !== 'FUEL' || !existing.isActive) {
        throw new BadRequestException(
          'La tarjeta local asociada no es una tarjeta fuel activa.',
        );
      }
      if (existing.fuelStatus !== 'active') {
        throw new BadRequestException('La tarjeta de gasolina no está activa.');
      }
      return existing.id;
    }

    const created = await this.prismaService.card.create({
      data: {
        cardNumber: sapCard.cardNumber,
        type: 'FUEL',
        companyId: input.companyId,
        isActive: true,
        fuelName: sapCard.name.length > 0 ? sapCard.name : `Tarjeta ${sapCard.cardNumber.slice(-4)}`,
        fuelStatus: 'active',
        sapCode: sapCard.sapCode,
        sapSyncedAt: new Date(),
      },
      select: { id: true },
    });

    return created.id;
  }

  private async assertActiveFuelCard(cardId: number): Promise<void> {
    const card = await this.prismaService.card.findUnique({
      where: { id: cardId },
      select: { id: true, type: true, fuelStatus: true, isActive: true },
    });

    if (card === null) {
      throw new NotFoundException('La tarjeta de gasolina no existe.');
    }
    if (card.type !== 'FUEL' || !card.isActive) {
      throw new BadRequestException(
        'La tarjeta indicada no es una tarjeta fuel activa.',
      );
    }
    if (card.fuelStatus !== 'active') {
      throw new BadRequestException('La tarjeta de gasolina no está activa.');
    }
  }
}
