import { Factory } from '@concepta/typeorm-seeding';
import { UserRole } from './user-role.entity';

export class UserRoleFactory extends Factory<UserRole> {
  protected async entity(): Promise<UserRole> {
    const userRole = new UserRole();
    return userRole;
  }
}
