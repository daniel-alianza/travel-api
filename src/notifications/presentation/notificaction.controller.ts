import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  SendRequestSentNotificationUseCase,
  type SendRequestSentNotificationResponse,
} from '../application/use-cases/send-request-sent-notification.use-case';
import { RequestSentNotificationDto } from './dtos/request-sent-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificactionController {
  constructor(
    private readonly sendRequestSentNotificationUseCase: SendRequestSentNotificationUseCase,
  ) {}

  @Post('send')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @ApiOperation({
    summary: 'Enviar notificación de solicitud de viáticos',
    description:
      'Renderiza la plantilla y envía el correo de confirmación al empleado que realizó la solicitud.',
  })
  @ApiBody({ type: RequestSentNotificationDto })
  @ApiCreatedResponse({
    description: 'Notificación enviada correctamente.',
  })
  async sendNotification(
    @Body() requestBody: RequestSentNotificationDto,
  ): Promise<SendRequestSentNotificationResponse> {
    return this.sendRequestSentNotificationUseCase.execute({
      recipientEmail: requestBody.recipientEmail,
      employeeName: requestBody.employeeName,
      bossName: requestBody.bossName,
      companyName: requestBody.companyName,
      cardNumber: requestBody.cardNumber,
      requestId: requestBody.requestId,
      motivo: requestBody.motivo,
      destinos: requestBody.destinos,
      totalAmount: requestBody.totalAmount,
      gasolinaAmount: requestBody.gasolinaAmount,
      tagAmount: requestBody.tagAmount,
      tripCount: requestBody.tripCount,
      appUrl: requestBody.appUrl,
    });
  }
}
