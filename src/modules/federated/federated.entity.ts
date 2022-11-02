import { CommonEntity } from '../../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FederatedInterface } from './interfaces';
import { User } from '../../infrastructure/database/postgres/user/user.entity';

@Entity()
export class Federated extends CommonEntity implements FederatedInterface {
  @Column()
  provider!: string;

  @Column()
  providerRef!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, user => user.federated)
  user!: User;
}
