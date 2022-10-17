import { registerAs } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';
import { SeverityLevel } from '@sentry/types';
import { LoggerSentryConfigInterface } from '../modules/logger/interfaces';

export const loggerSentryConfig = registerAs(
  'LOGGER_MODULE_SENTRY_CONFIG',
  (): LoggerSentryConfigInterface => ({
    dsn: process.env?.SENTRY_DSN ?? '',
    logLevelMap: (logLevel: LogLevel): SeverityLevel => {
      switch (logLevel) {
        case 'error':
          return 'error';
        case 'debug':
          return 'debug';
        case 'log':
          return 'log';
        case 'warn':
          return 'warning';
        case 'verbose':
          return 'info';
      }
    },
  })
);
