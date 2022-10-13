import { DynamicModule, Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailModuleOptionsInterface } from './interfaces/email-module-options.interface';
import { SEND_EMAIL_TOKEN } from './constants';
///
@Global()
@Module({})
export class EmailModule {
  static registerAsync(options: EmailModuleOptionsInterface): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports ?? [],
      providers: [
        EmailService,
        {
          provide: SEND_EMAIL_TOKEN,
          inject: options.inject ?? [],
          useFactory: options.useFactory,
        },
      ],
      controllers: [EmailController],
      exports: [EmailService],
    };
  }
}
