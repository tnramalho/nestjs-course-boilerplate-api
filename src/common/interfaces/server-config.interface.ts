import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export interface ServerConfigInterface {
  environment: string;
  port: number;
  cors?: CorsOptions;
}
