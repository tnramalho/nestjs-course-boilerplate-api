import { registerAs } from '@nestjs/config';
import { JWT_MODULE_CONFIG } from '../common/constants';
import { JwtConfigInterface } from '../common/interfaces';

export const jwtConfig = registerAs(
  JWT_MODULE_CONFIG,
  (): JwtConfigInterface => ({
    secret: process.env.JWT_SECRET || 'there is no access secret',
    access: {
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
      },
    },
    refresh: {
      signOptions: {
        expiresIn: process.env.JWT_REFRESH_EXPIRES || '1y',
      },
    },
  })
);
