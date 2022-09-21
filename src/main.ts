import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './common/doc/swagger';
import { serverConfig } from './config/server.config';

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Register swagger for development
  await swagger(app, appServerConfig.environment);

  await app.listen(3000);
}
bootstrap();
