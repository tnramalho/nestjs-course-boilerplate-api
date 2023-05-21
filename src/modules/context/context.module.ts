import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
@Module({
  providers: [ContextService],
  exports: [ContextService],
})
export class ContextModule {}
