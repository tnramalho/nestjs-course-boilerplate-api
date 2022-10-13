import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailOptionsInterface } from '../email/interfaces/email-options.interface';
import { SendEmailServiceInterface } from '../email/interfaces/send-email-service.interface';

@Injectable()
export class HandlebarEmailService implements SendEmailServiceInterface {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * logic to send email based on options
   *
   * @param emailOptions
   */
  async send(emailOptions: EmailOptionsInterface) {
    const result = await this.mailerService.sendMail(emailOptions);
    console.log(result);
    return result;
  }
}
