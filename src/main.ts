import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './common/doc/swagger';
import { ErrorCodeExceptionFilter } from './common/filters/error-code-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { serverConfig } from './config/server.config';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerSentryTransport } from './modules/logger/transports/logger-sentry.transport';

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);

  app.enableCors(appServerConfig.cors);

  // Add Globals
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorCodeExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Add Logger
  const customLoggerService = app.get(LoggerService);
  const loggerSentryTransport = app.get(LoggerSentryTransport);

  customLoggerService.addTransport(loggerSentryTransport);
  customLoggerService.setContext('bootstrap');
  // Register swagger for development
  await swagger(app, appServerConfig.environment);

  await app.listen(appServerConfig.port || 3000);
}
bootstrap();
