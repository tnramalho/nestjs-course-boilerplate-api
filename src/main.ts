import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './common/doc/swagger';
import { serverConfig } from './config/server.config';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerSentryTransport } from './modules/logger/transports/logger-sentry.transport';

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const customLoggerService = app.get(LoggerService);
  const loggerSentryTransport = app.get(LoggerSentryTransport);

  customLoggerService.addTransport(loggerSentryTransport);
  customLoggerService.setContext('bootstrap');
  // Register swagger for development
  await swagger(app, appServerConfig.environment);

  await app.listen(3000);
}
bootstrap();
