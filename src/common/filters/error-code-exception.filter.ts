import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodeExceptionInterface } from '../interfaces/error-code-exception.interface';

@Catch()
export class ErrorCodeExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException & ErrorCodeExceptionInterface,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      errorCode: exception?.errorCode,
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
