import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { LoggerTransportService } from './logger-transport.service';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { Request, Response } from 'express';
import { LoggerTransportInterface } from './interfaces';

/**
 * A Custom logger Service
 *
 */
@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(private transportService: LoggerTransportService) {
    super();
  }

  exception(error: Error, message?: string, context?: string | undefined) {
    // message is missing?
    if (!message) {
      // yes, set it
      message = error.message;
    }

    // is this a low severity http exception?
    if (
      error instanceof HttpException &&
      error.getStatus() >= 400 &&
      error.getStatus() < 500
    ) {
      // not severe, log it as debug
      super.debug(message, context);
      // pass full exception to transport service
      this.transportService.log(message, 'debug' as LogLevel, error);
    } else {
      // log as error
      super.error(message, error.stack, context);
      // pass full exception to transport service
      this.transportService.log(message, 'error' as LogLevel, error);
    }
  }

  error(
    message: string,
    trace?: string | undefined,
    context?: string | undefined
  ): void {
    super.error(message, trace, context);
    // get a trace?
    if (trace) {
      // yes, build up real error
      const error = new Error(message);
      error.stack = trace;
      // call transport with error
      this.transportService.log(message, 'error' as LogLevel, error);
    } else {
      // call transport with no error
      this.transportService.log(message, 'error' as LogLevel);
    }
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.transportService.log(message, 'warn' as LogLevel);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    this.transportService.log(message, 'debug' as LogLevel);
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.transportService.log(message, 'log' as LogLevel);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    this.transportService.log(message, 'verbose' as LogLevel);
  }

  formatRequestMessage(req: Request): string {
    const { method, url } = req;
    const now = new Date();

    return `${now.toISOString()} ${method} ${url}`;
  }

  formatResponseMessage(
    req: Request,
    res: Response,
    startDate: Date,
    error?: Error
  ): string {
    const { method, url } = req;
    const now = new Date();

    return (
      `${now.toISOString()} ${method} ${url} ${res.statusCode} ` +
      `${now.getTime() - startDate.getTime()}ms` +
      (error ? ` - ${error}` : '')
    );
  }

  addTransport(transport: LoggerTransportInterface) {
    this.transportService.addTransport(transport);
  }
}
