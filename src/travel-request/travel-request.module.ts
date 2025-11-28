import { Module } from '@nestjs/common';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaTravelRequestRepository } from './infraestructure/repositories';
import { TravelRequestController } from './presentation/travel-request.controller';
import {
  GetAllTravelRequestsUseCase,
  CreateTravelRequestUseCase,
  ApproveTravelRequestUseCase,
  RejectTravelRequestUseCase,
  GetDisbursementsUseCase,
} from './application/use-cases';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TravelRequestController],
  providers: [
    PrismaTravelRequestRepository,
    GetAllTravelRequestsUseCase,
    CreateTravelRequestUseCase,
    ApproveTravelRequestUseCase,
    RejectTravelRequestUseCase,
    GetDisbursementsUseCase,
    {
      provide: 'TravelRequestRepository',
      useExisting: PrismaTravelRequestRepository,
    },
  ],
  exports: ['TravelRequestRepository'],
})
export class TravelRequestModule {}
