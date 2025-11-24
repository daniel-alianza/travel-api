import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { exec } from 'child_process';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  exec('curl ifconfig.me', (error, stdout, stderr) => {
    if (error) {
      Logger.error(`Error al obtener la IP: ${stderr}`);
    } else {
      Logger.log(`IP pública del servidor: ${stdout.trim()}`);
    }
  });

  const app = await NestFactory.create(AppModule);

  // Configurar cookie-parser antes de otras configuraciones
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`🚀 Api running on port ${port}`);
}

void bootstrap();
