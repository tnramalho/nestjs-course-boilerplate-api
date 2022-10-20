import { registerAs } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

export const emailConfig = registerAs(
  'APP_EMAIL_MODULE_CONFIG',
  (): MailerOptions => ({
    transport: {
      host: process.env?.MAILGUN_SMTP_SERVER ?? 'smtp.mailgun.org',
      port: process.env?.MAILGUN_SMTP_PORT
        ? Number(process.env?.EMAIL_SMTP_PORT)
        : 587,
      auth: {
        user: process.env?.MAILGUN_SMTP_LOGIN ?? '',
        pass: process.env?.MAILGUN_SMTP_PASSWORD ?? '',
      },
    },
    defaults: {
      from: process.env?.MAILGUN_FROM_EMAIL ?? '',
    },
    template: {
      dir:
        __dirname +
        '/../../' +
        (process.env?.MAILGUN_TEMPLATE_PATH ?? '/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  })
);
