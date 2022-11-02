import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../../core/user/use-case/create-user.use-case';
import { FindAllUserUseCase } from '../../core/user/use-case/final-all-user.use-case';
import { UserService } from '../../web/controller/user/user.service';
import { UserReportController } from '../../web/controller/user/user-report.controller';
import { UserController } from '../../web/controller/user/user.controller';
import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from '../../core/user/infrastructure/constants/use-case.constants';
import { User } from '../../infrastructure/database/postgres/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UserReportController],
  providers: [
    {
      provide: USER_REPOSITORY,
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(User);
      },
    },
    CreateUserUseCase,
    FindAllUserUseCase,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
