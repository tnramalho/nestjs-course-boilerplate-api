import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UsersModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
