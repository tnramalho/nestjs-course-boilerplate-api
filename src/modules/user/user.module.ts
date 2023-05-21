import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserReportController } from './user-report.controller';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [
    // LoggerModule.register({
    //   context: 'UserModule',
    // }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, UserReportController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
