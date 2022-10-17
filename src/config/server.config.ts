import { registerAs } from '@nestjs/config';
import { SERVER_CONFIG } from '../common/constants';
import { ServerConfigInterface } from '../common/interfaces';

export const serverConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: process.env?.NODE_ENV ?? 'development',
    api: 'http://localhost:3000',
    port:
      'string' === typeof process.env.PORT ? parseInt(process.env.PORT) : 3001,
    cors: {
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN
        : 'http://localhost:3000',
    },
  })
);
