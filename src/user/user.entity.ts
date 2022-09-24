import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { UserInterface } from './interfaces';
import { CommonEntity } from '../common/common.entity';
import { UserRole } from '../user-role/user-role.entity';

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

  @Column({ type: 'citext' })
  email!: string;

  @Column({ default: true, nullable: false })
  active!: boolean;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles?: UserRole[];

  // TODO: One way to do many to many relationship
  // @ManyToMany(() => Role, (role) => role.users, {
  //   cascade: true,
  // })
  // @JoinTable()
  // roles!: Role[];
}
