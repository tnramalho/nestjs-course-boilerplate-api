import { DynamicModule, Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailModuleOptionsInterface } from './interfaces/email-module-options.interface';
import { SEND_EMAIL_TOKEN } from './constants';
import { LoggerModule } from '../logger/logger.module';

@Global()
@Module({
  imports: [ 
    // LoggerModule.register({
    //   context: 'EmailModule',
    // }),
  ],
})
export class EmailModule {
  static registerAsync(options: EmailModuleOptionsInterface): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports ?? [],
      providers: [
        EmailService,
        {
          provide: SEND_EMAIL_TOKEN,
          inject: options.inject ?? [],
          useFactory: options.useFactory,
        },
      ],
      controllers: [EmailController],
      exports: [EmailService],
    };
  }
}

// @Module({
//   providers: [EmailService],
//   controllers: [EmailController],
//   exports: [EmailService],
// })
// export class EmailModule extends ConfigurableModuleClass {
//   // static registerAsync(options: EmailAsyncOptions): DynamicModule {
//   //   // since my import is different we would need to format it
//   //   return super.registerAsync({
//   //     imports: options.imports ?? [],
//   //     provideInjectionTokensFrom: [
//   //       {
//   //         provide: SEND_EMAIL_TOKEN,
//   //         inject: options.inject ?? [],
//   //         useFactory: options.useFactory,
//   //       },
//   //     ],
//   //   });
//   // }
// }

/**
 * STEP 1
  @Global()
  @Module({})
  export class EmailModule extends ConfigurableModuleClass {
    static registerAsync(options: any): DynamicModule {
      // since my import is different we would need to format it
      return super.registerAsync({
        imports: options.imports ?? [],
      });
    }
  }
 */
