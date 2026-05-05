import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TravelRequestModule } from './travel-request/travel-request.module';
import { CommonModule } from './common/common.module';
import { CardsModule } from './cards/cards.module';
import { SapConnectionModule } from './infrastructure/SL/sap-connection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    TravelRequestModule,
    CommonModule,
    CardsModule,
    SapConnectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
