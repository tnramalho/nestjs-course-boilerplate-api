import { join } from 'path';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConfig } from './config/jwt.config';
import { loggerSentryConfig } from './config/logger-sentry.config';
import { loggerConfig } from './config/logger.config';
import sampleConfig from './config/sample.config';
import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ApiKeyMiddleware } from './modules/auth/midleware/api-key.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { RoleModule } from './modules/role/role.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_NAME, PUBLIC_URL } from './common/constants';

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
        sampleConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
    AuthModule,
    LoggerModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
