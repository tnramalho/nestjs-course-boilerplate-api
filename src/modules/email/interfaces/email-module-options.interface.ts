import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { SendEmailServiceInterface } from './send-email-service.interface';

//sendEmailService: SendEmailServiceInterface;
export interface EmailModuleOptionsInterface
  extends Pick<ModuleMetadata, 'imports'>,
    Partial<Pick<FactoryProvider<SendEmailServiceInterface>, 'inject'>> {
  useFactory: (...args: any[]) => SendEmailServiceInterface;
}
