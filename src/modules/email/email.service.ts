import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TEMPLATE_RESET_PASSWORD, TEMPLATE_TEST } from './constants';

// class EmailDto {
//   to!: string;
// }

// class ResetPasswordDto extends EmailDto {
//   resetToken!: string;
//   expirationDate!: Date;
// }

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  // // TODO: Implement if has time
  // async sendResetPasswordEmail(dto: ResetPasswordDto) {
  //   return await this.mailerService.sendMail({
  //     to: dto.to, // list of receivers
  //     template: TEMPLATE_RESET_PASSWORD,
  //     context: {
  //       tokenUrl: `${dto.resetToken}`,
  //       tokenExp:
  //         dto?.expirationDate instanceof Date
  //           ? dto.expirationDate.toUTCString()
  //           : '',
  //     },
  //   });
  // }

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
    return await this.mailerService.sendMail({
      to: to, // list of receivers
      template: TEMPLATE_TEST,
      context: {
        firstName: `${firstName}`,
      },
    });
  }
}
