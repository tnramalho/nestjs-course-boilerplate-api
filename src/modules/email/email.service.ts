import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { SEND_EMAIL_TOKEN, TEMPLATE_TEST } from './constants';
import { EmailOptionsInterface } from './interfaces/email-options.interface';
import { SendEmailServiceInterface } from './interfaces/send-email-service.interface';

@Injectable()
export class EmailService {
  constructor(
    @Inject(SEND_EMAIL_TOKEN)
    private readonly sendEmailService: SendEmailServiceInterface,
    private readonly loggerService: LoggerService
  ) {}

  /**
   * logic to send email based on options
   *
   * @param emailOptions
   */
  async send(emailOptions: EmailOptionsInterface) {
    try {
      const result = await this.sendEmailService.send({
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
    return await this.send({
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
