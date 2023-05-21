import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { LoggerTransportService } from './logger-transport.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerExceptionFilter } from './logger-exception.filter';
import { LoggerRequestInterceptor } from './logger-request.interceptor';
import { LoggerSentryTransport } from './transports/logger-sentry.transport';
import { loggerConfig } from '../../config/logger.config';
import { loggerSentryConfig } from '../../config/logger-sentry.config';
import {
  LOGGER_MODULE_OPTIONS_TOKEN,
  LoggerAsyncOptions,
  LoggerConfigurableModuleClass,
  LoggerOptions,
} from './logger.module-definition';

//@Global()
@Module({
  imports: [
    ConfigModule.forFeature(loggerConfig),
    ConfigModule.forFeature(loggerSentryConfig),
  ],
  providers: [
    LoggerService,
    LoggerTransportService,
    LoggerSentryTransport,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerRequestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LoggerExceptionFilter,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule extends LoggerConfigurableModuleClass {
  static register(options: LoggerOptions): DynamicModule {
    return super.register(options);
  }

  static registerAsync(options: LoggerAsyncOptions): DynamicModule {
    return super.registerAsync(options);
  }

  static forRoot(options: LoggerOptions): DynamicModule {
    return super.register({ ...options, global: true });
  }

  static forRootAsync(options: LoggerAsyncOptions): DynamicModule {
    return super.registerAsync({ ...options, global: true });
  }
}
