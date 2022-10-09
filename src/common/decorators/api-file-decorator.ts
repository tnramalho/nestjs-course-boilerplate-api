import { ApiBody } from '@nestjs/swagger';

export const ApiFileDecorator =
  (fileName = 'file'): MethodDecorator =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
