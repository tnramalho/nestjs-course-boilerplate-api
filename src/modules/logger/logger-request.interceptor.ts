import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerRequestInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private loggerService: LoggerService) {}

  intercept(
    _context: ExecutionContext,
    _next: CallHandler
  ): Observable<Response<T>> {
    const req: Request = _context.switchToHttp().getRequest();
    const res: Response = _context.switchToHttp().getResponse();
    const startDate = new Date();

    const context = _context.getClass().name;
    // set context where it was called from
    this.loggerService.setContext(_context.getClass().name);

    // format the request message
    const message = this.loggerService.formatRequestMessage(req);

    // log the incoming request
    this.loggerService.log(message, context);

    return _next.handle().pipe(
      tap(() => this.responseSuccess(req, res, startDate, context)),
      // catch all errors
      catchError((error: Error) =>
        this.responseError(req, res, startDate, error, context)
      )
    );
  }

  /**
   * Method to log response success
   *
   * @param req Request
   * @param res Response
   * @param startDate the date for the message
   */
  responseSuccess(
    req: Request,
    res: Response,
    startDate: Date,
    context: string
  ) {
    // format the response message
    const message = this.loggerService.formatResponseMessage(
      req,
      res,
      startDate
    );
    // log the response
    this.loggerService.log(message, context);
  }

  /**
   * Format exception error
   *
   * @param req
   * @param res
   * @param startDate
   * @param error
   * @returns
   */
  responseError(
    req: Request,
    res: Response,
    startDate: Date,
    error: Error,
    context: string
  ) {
    // format the message
    const message = this.loggerService.formatResponseMessage(
      req,
      res,
      startDate,
      error
    );

    // log as an exception
    this.loggerService.exception(error, message, context);

    // all done, re-throw original error
    return throwError(() => error);
  }
}
