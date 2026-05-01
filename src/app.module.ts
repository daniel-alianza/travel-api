import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TravelRequestModule } from './travel-request/travel-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    TravelRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
