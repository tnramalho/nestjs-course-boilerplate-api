import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './modules/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService
  ) {}

  @Get()
  getSampleConfig(): string {
    return this.appService.getSampleConfig();
  }

  @Get('log')
  log(): string {
    this.loggerService.log('AppController.log()');
    return this.loggerService.getContext();
  }

  @Get('log/app-service')
  logApp(): string {
    return this.appService.log();
  }
}
