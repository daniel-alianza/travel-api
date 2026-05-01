import { Module } from '@nestjs/common';
import { CreateTravelRequestUseCase } from './application/use-cases/create-travel-request.use-case';
import { GetTravelRequestFormDataUseCase } from './application/use-cases/get-travel-request-form-data.use-case';
import { GetUserFuelCardsUseCase } from './application/use-cases/get-user-fuel-cards.use-case';
import { TravelRequestPrismaRepository } from './infrastructure/travel-request-prisma.repository';
import { TravelRequestController } from './presentation/travel-request.controller';

@Module({
  controllers: [TravelRequestController],
  providers: [
    TravelRequestPrismaRepository,
    CreateTravelRequestUseCase,
    GetTravelRequestFormDataUseCase,
    GetUserFuelCardsUseCase,
    {
      provide: 'TravelRequestRepository',
      useExisting: TravelRequestPrismaRepository,
    },
  ],
})
export class TravelRequestModule {}
