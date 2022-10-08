import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function swagger(app: INestApplication, environment: string) {
  if (environment !== 'development') {
    return;
  }
  // document options
  const docOptions = new DocumentBuilder()
    .setTitle('NestJS Boilerplate API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // create document
  const document = SwaggerModule.createDocument(app, docOptions);

  // set up docs route
  SwaggerModule.setup('api', app, document);
}
