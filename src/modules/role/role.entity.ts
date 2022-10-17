import { CommonEntity } from '../../common/common.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserRole } from '../user-role/user-role.entity';

@Entity()
@Unique(['name'])
export class Role extends CommonEntity {
  @Column()
  name!: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles!: UserRole[];

  //TODO: One way to do ManyToMany relationship
  // @ManyToMany(() => User, (user) => user.roles)
  // users!: User[];
}
