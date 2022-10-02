import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ErrorCodeExceptionInterface } from '../interfaces/error-code-exception.interface';

@Catch()
export class ErrorCodeExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: HttpException & ErrorCodeExceptionInterface,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus ? exception?.getStatus() : 500;

    response.status(status).json({
      errorCode: exception?.errorCode,
      statusCode: status,
      message: exception?.message,
      timestamp: new Date().toISOString(),
    });
    //super.catch(exception, host);
  }
}
