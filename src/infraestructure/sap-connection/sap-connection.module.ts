import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SapHttpService } from './sap-http.service';
import { SapAuthAdapter } from './sap-auth.adapter';

@Module({
  imports: [HttpModule],
  providers: [
    SapHttpService,
    SapAuthAdapter,
    {
      provide: 'SapAuthPort',
      useExisting: SapAuthAdapter,
    },
  ],
  exports: ['SapAuthPort', SapHttpService],
})
export class SapConnectionModule {}

