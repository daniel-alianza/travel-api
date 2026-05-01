import { Module } from '@nestjs/common';
import { CreateTravelRequestUseCase } from './application/use-cases/create-travel-request.use-case';
import { TravelRequestPrismaRepository } from './infrastructure/travel-request-prisma.repository';
import { TravelRequestController } from './presentation/travel-request.controller';

@Module({
  controllers: [TravelRequestController],
  providers: [
    TravelRequestPrismaRepository,
    CreateTravelRequestUseCase,
    {
      provide: 'TravelRequestRepository',
      useExisting: TravelRequestPrismaRepository,
    },
  ],
})
export class TravelRequestModule {}
