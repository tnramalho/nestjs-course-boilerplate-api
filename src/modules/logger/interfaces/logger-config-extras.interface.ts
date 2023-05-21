import { DynamicModule } from '@nestjs/common';

export type LoggerConfigExtrasInterface = Pick<
  DynamicModule,
  'global' | 'controllers'
>;
