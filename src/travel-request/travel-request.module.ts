import { Module } from '@nestjs/common';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { PrismaTravelRequestRepository } from './infraestructure/repositories';
import { TravelRequestController } from './presentation/travel-request.controller';
import { GetAllTravelRequestsUseCase } from './application/use-cases/get-all-travel-requests.use-case';
import { CreateTravelRequestUseCase } from './application/use-cases/create-travel-request.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TravelRequestController],
  providers: [
    PrismaTravelRequestRepository,
    GetAllTravelRequestsUseCase,
    CreateTravelRequestUseCase,
    {
      provide: 'TravelRequestRepository',
      useExisting: PrismaTravelRequestRepository,
    },
  ],
  exports: ['TravelRequestRepository'],
})
export class TravelRequestModule {}
