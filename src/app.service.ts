import { Inject, Injectable } from '@nestjs/common';
import {
  //ConfigService,
  ConfigType,
} from '@nestjs/config';
import sampleConfig from './config/sample.config';

// interface DatabaseConfig {
//   host: string;
//   port: number;
// }

@Injectable()
export class AppService {
  constructor(
    //  private configService: configService@Inject(sampleConfig.KEY)
    @Inject(sampleConfig.KEY)
    private dbConfig: ConfigType<typeof sampleConfig>
  ) {}

  getSampleConfig(): string {
    const port = this.dbConfig.port;
    const host = this.dbConfig.host;
    return `
    Port: ${port}
    Database Host: ${host}
    `;
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
