import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSampleConfig(): string {
    return this.appService.getSampleConfig();
  }
}
