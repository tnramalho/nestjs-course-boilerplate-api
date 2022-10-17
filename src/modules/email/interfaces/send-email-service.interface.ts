import { EmailOptionsInterface } from './email-options.interface';

export interface SendEmailServiceInterface {
  send(emailOptions: EmailOptionsInterface): Promise<any>;
}
