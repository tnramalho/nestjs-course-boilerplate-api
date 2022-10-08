import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Exception } from '@sentry/types';
import { LoggerService } from '../logger/logger.service';
import { TEMPLATE_RESET_PASSWORD, TEMPLATE_TEST } from './constants';
import { EmailOptions } from './interfaces/email-options.interface';

// class EmailDto {
//   to!: string;
// }

// class ResetPasswordDto extends EmailDto {
//   resetToken!: string;
//   expirationDate!: Date;
// }

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly loggerService: LoggerService
  ) {}

  /**
   * logic to send email based on options
   *
   * @param emailOptions
   */
  async send(emailOptions: EmailOptions) {
    try {
      const result = await this.mailerService.sendMail({
        from: 'noreply@gmail.com',
        ...emailOptions,
      });
      console.log(result);
      return result;
    } catch (e: any) {
      this.loggerService.error(e?.message, EmailService.name);
      throw new InternalServerErrorException(
        'Fatal error while trying to send email.'
      );
    }
  }

  async sendTestEmail() {
    return await this.mailerService.sendMail({
      to: 'nestjs-devpro-course@dispostable.com', // list of receivers
      from: 'noreply@dispostable.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });
  }

  async sendEmailWithTemplate(to: string, firstName: string) {
    return await this.send({
      to: to, // list of receivers
      template: TEMPLATE_TEST,
      context: {
        firstName: `${firstName}`,
      },
    });
  }
}
