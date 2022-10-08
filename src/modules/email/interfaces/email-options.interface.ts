import { ISendMailOptions } from '@nestjs-modules/mailer';

export type EmailOptions = Pick<
  ISendMailOptions,
  'to' | 'cc' | 'bcc' | 'from' | 'context' | 'subject' | 'template'
>;
