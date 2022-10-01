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

    // set context where it was called from
    this.loggerService.setContext(_context.getClass().name);

    // format the request message
    const message = this.loggerService.formatRequestMessage(req);

    // log the incoming request
    this.loggerService.log(message);

    return _next.handle().pipe(
      tap(() => {
        // format the response message
        const message = this.loggerService.formatResponseMessage(
          req,
          res,
          startDate
        );
        // log the response
        this.loggerService.log(message);
      }),
      // catch all errors
      catchError((error: Error) => {
        // format the message
        const message = this.loggerService.formatResponseMessage(
          req,
          res,
          startDate,
          error
        );

        // log as an exception
        this.loggerService.exception(error, message);

        // all done, re-throw original error
        return throwError(() => error);
      })
    );
  }
}
