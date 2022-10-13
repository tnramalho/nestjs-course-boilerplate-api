import { Module } from '@nestjs/common';
import { HandlebarEmailService } from './handlebar-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { emailConfig } from '../../config/email.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [emailConfig.KEY],
      useFactory: async (config: ConfigType<typeof emailConfig>) => {
        return config;
      },
    }),
  ],
  providers: [HandlebarEmailService],
  exports: [HandlebarEmailService],
})
export class HandlebarEmailModule {}
