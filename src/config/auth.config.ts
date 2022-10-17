import { registerAs } from '@nestjs/config';
import { AuthConfigInterface } from '../modules/auth/interfaces/auth-config.interface';

export const authConfig = registerAs(
  'AUTH_MODULE_CONFIG',
  (): AuthConfigInterface => ({
    resetToken: {
      ttl: process.env?.AUTH_RESET_TOKEN_TTL
        ? Number(process.env?.AUTH_RESET_TOKEN_TTL)
        : 2 * 60,
    },
  })
);
