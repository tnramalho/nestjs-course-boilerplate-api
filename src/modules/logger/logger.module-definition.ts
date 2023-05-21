import { ConfigurableModuleBuilder, DynamicModule } from '@nestjs/common';
import { LoggerConfigInterface } from './interfaces';
import { LoggerConfigExtrasInterface } from './interfaces/logger-config-extras.interface';

export const {
  ConfigurableModuleClass: LoggerConfigurableModuleClass,
  // This gonna be injected into services
  MODULE_OPTIONS_TOKEN: LOGGER_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE: LOGGER_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: LOGGER_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<LoggerConfigInterface>({
  moduleName: 'Logger',
})
  //.setClassMethodName('forRoot')
  .setExtras<LoggerConfigExtrasInterface>(
    { global: false },
    definitionTransform
  )
  .build();

export type LoggerOptions = Omit<typeof LOGGER_OPTIONS_TYPE, 'global'>;
export type LoggerAsyncOptions = Omit<
  typeof LOGGER_ASYNC_OPTIONS_TYPE,
  'global'
>;

function definitionTransform(
  definition: DynamicModule,
  extras: LoggerConfigExtrasInterface
): DynamicModule {
  const { global = false } = extras;

  return {
    ...definition,
    global,
  };
}