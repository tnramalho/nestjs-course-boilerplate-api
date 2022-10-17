import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoggerModule } from '../logger/logger.module';
import { UserReportController } from './user-report.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UserController, UserReportController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
