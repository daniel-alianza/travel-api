import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SapAuthAdapter } from './sap-auth.adapter';
import { SapHttpService } from './sap-http.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    SapHttpService,
    SapAuthAdapter,
    {
      provide: 'SapAuthPort',
      useExisting: SapAuthAdapter,
    },
  ],
  exports: ['SapAuthPort', SapHttpService, SapAuthAdapter],
})
export class SapConnectionModule {}
