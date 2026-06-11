import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/filters/http-exception.filter';
import { UnknownExceptionFilter } from './common/exceptions/filters/unknown-exception.filter';
import { getHttpConfig } from './config/http/http';

async function bootstrap() {
  const { maxJsonBodyBytes } = getHttpConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: maxJsonBodyBytes });
  app.useBodyParser('urlencoded', { limit: maxJsonBodyBytes, extended: true });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new UnknownExceptionFilter());

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-pa-secret'],
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Travel API')
    .setDescription(
      'Documentación de endpoints de autenticación y módulos base',
    )
    .setVersion('1.0.0')
    .addCookieAuth('travel_session')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `Server is running on port http://localhost:${process.env.PORT}🚀😊`,
  );
}
void bootstrap();
