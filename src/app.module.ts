import { join } from 'path';

import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConfig } from './infrastructure/config/jwt.config';
import { loggerSentryConfig } from './infrastructure/config/logger-sentry.config';
import { loggerConfig } from './infrastructure/config/logger.config';
import sampleConfig from './infrastructure/config/sample.config';
import { typeormConfig } from './infrastructure/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ApiKeyMiddleware } from './modules/auth/midleware/api-key.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { RoleModule } from './modules/role/role.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_NAME, PUBLIC_URL } from './common/constants';
import { EmailModule } from './modules/email/email.module';
import { emailConfig } from './infrastructure/config/email.config';
import { authConfig } from './infrastructure/config/auth.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarEmailModule } from './modules/handlebar-email/handlebar-email.module';
import { HandlebarEmailService } from './modules/handlebar-email/handlebar-email.service';
import { githubConfig } from './infrastructure/config/github.config';
import { FederatedModule } from './modules/federated/federated.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', PUBLIC_FOLDER_NAME),
      serveRoot: PUBLIC_URL,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        typeormConfig,
        jwtConfig,
        loggerConfig,
        loggerSentryConfig,
        emailConfig,
        authConfig,
        githubConfig,
        sampleConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
    AuthModule,
    LoggerModule,
    UploadModule,
    EmailModule.registerAsync({
      imports: [HandlebarEmailModule],
      inject: [HandlebarEmailService],
      useFactory: (emailService: HandlebarEmailService) => {
        return emailService;
      },
    }),
    FederatedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude('(.*)')
      //.exclude('auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
