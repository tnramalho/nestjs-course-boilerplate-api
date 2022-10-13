export interface EmailOptionsInterface {
  to?: string | Array<string>;
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
  replyTo?: string;
  inReplyTo?: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  context?: {
    [name: string]: any;
  };
  template?: string;
}
