import { CommonEntity } from '../../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { FederatedInterface } from './interfaces';

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
