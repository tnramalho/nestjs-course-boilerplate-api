import { LogLevel } from '@nestjs/common';
import { NodeOptions as SentryNodeOptions } from '@sentry/node/types';
import { SeverityLevel } from '@sentry/types';

export interface LoggerSentryConfigInterface extends SentryNodeOptions {
  logLevelMap: (logLevel: LogLevel) => SeverityLevel;
}
