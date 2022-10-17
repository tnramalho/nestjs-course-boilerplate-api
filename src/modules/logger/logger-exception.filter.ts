import { Catch, ArgumentsHost, Injectable, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from './logger.service';

@Catch()
@Injectable()
export class LoggerExceptionFilter extends BaseExceptionFilter {
  /**
   * Inject logger service
   */
  @Inject(LoggerService)
  private loggerService!: LoggerService;

  /**
   * Override catch to log before returning exception.
   */
  catch(exception: Error, host: ArgumentsHost) {
    this.loggerService.exception(
      exception,
      undefined,
      LoggerExceptionFilter.name
    );
    super.catch(exception, host);
  }
}
