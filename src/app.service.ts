import { Inject, Injectable } from '@nestjs/common';
import {
  //ConfigService,
  ConfigType,
} from '@nestjs/config';
import sampleConfig from './config/sample.config';
import { LoggerService } from './modules/logger/logger.service';

// interface DatabaseConfig {
//   host: string;
//   port: number;
// }

@Injectable()
export class AppService {
  constructor(
    //  private configService: configService@Inject(sampleConfig.KEY)
    @Inject(sampleConfig.KEY)
    private dbConfig: ConfigType<typeof sampleConfig>,
    private readonly loggerService: LoggerService
  ) {}

  getSampleConfig(): string {
    const port = this.dbConfig.port;
    const host = this.dbConfig.host;
    return `
    Port: ${port}
    Database Host: ${host}
    `;
  }

  log(): string {
    this.loggerService.log('AppService.log()');
    return this.loggerService.getContext();
  }

  // getSampleConfig(): string {
  //   const port = this.configService.get('port', { infer: true });
  //   const host = this.configService.get<DatabaseConfig>('database');
  //   return `
  //   Port: ${port}
  //   Database Host: ${host?.host}
  //   `;
  // }
}
