import { Module } from '@nestjs/common';
import { FederatedService } from './federated.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Federated } from './federated.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Federated])],
  controllers: [],
  providers: [FederatedService],
  exports: [FederatedService],
})
export class FederatedModule {}
