import { ConfigurableModuleBuilder } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailModuleOptionsInterface } from './interfaces/email-module-options.interface';
import { SEND_EMAIL_TOKEN } from './constants';

export const RAW_OPTIONS_TOKEN = Symbol('RAW_OPTIONS_TOKEN');

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<EmailModuleOptionsInterface>({
  moduleName: 'Email',
  optionsInjectionToken: RAW_OPTIONS_TOKEN,
}).build();

export type EmailAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
