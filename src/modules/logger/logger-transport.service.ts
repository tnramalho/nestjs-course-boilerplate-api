import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, LogLevel } from '@nestjs/common';
import { LoggerTransportInterface } from './interfaces/logger-transport.interface';
import { loggerConfig } from '../../config/logger.config';

@Injectable()
export class LoggerTransportService {
  private readonly logLevels: LogLevel[] = ['error'];
  private readonly loggerTransports: LoggerTransportInterface[] = [];

  constructor(
    @Inject(loggerConfig.KEY) private config: ConfigType<typeof loggerConfig>
  ) {
    if (this.config?.transportLogLevel) {
      this.logLevels = this.config.transportLogLevel;
    }
  }

  public addTransport(transport: LoggerTransportInterface) {
    this.loggerTransports.push(transport);
  }

  public log(message: string, logLevel: LogLevel, error?: Error): void {
    // are we supposed to send this log level?
    if (this.logLevels.includes(logLevel)) {
      // yes, call all logger transports
      this.loggerTransports.map(loggerTransport =>
        loggerTransport.log(message, logLevel, error)
      );
    }
  }
}
