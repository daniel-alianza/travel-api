import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { TravelRequestModule } from '../travel-request/travel-request.module';
import { GetSalesViaticosHomeNoticeUseCase } from './application/use-cases/get-sales-viaticos-home-notice.use-case';
import { CommonController } from './common.controller';

@Module({
  imports: [AuthModule, PrismaModule, TravelRequestModule],
  controllers: [CommonController],
  providers: [GetSalesViaticosHomeNoticeUseCase],
})
export class CommonModule {}
