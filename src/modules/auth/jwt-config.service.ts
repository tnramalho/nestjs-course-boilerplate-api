import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>
  ) {}

  getAccessConfig(): JwtModuleOptions {
    return this.config.access;
  }

  getRefreshConfig(): JwtModuleOptions {
    return this.config.refresh;
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.secret,
      signOptions: this.config.access.signOptions,
    };
  }
}
