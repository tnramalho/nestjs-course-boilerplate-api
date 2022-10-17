import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { UserInterface } from './interfaces';
import { CommonEntity } from '../../common/common.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Federated } from '../federated/federated.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext', nullable: false })
  username!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt!: string;

  @Column({ type: 'citext', nullable: true })
  firstName!: string;

  @Column({ type: 'citext', nullable: true })
  lastName!: string;

  @Column({ type: 'citext', nullable: true })
  email!: string;

  @Column({ default: true, nullable: false })
  active!: boolean;

  @Column({ type: 'uuid', nullable: true })
  resetToken!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExp!: Date | null;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => Federated, federated => federated.user)
  federated?: Federated[];
}
