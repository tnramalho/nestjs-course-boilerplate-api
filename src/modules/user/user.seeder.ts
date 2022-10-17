import { Seeder } from '@concepta/typeorm-seeding';
import { RoleFactory } from '../role/role.factory';
import { UserRoleFactory } from '../user-role/user-role.factory';
import { UserFactory } from './user.factory';

export class UserSeeder extends Seeder {
  async run() {
    // Create Roles
    const adminRole = await this.factory(RoleFactory).create({
      name: 'admin',
    });
    const userRole = await this.factory(RoleFactory).create({
      name: 'user',
    });

    // Create User
    const userWithAdminRole = await this.factory(UserFactory).create();
    const userWithUserRole = await this.factory(UserFactory).create();

    // Create User Roles
    await this.factory(UserRoleFactory).create({
      userId: userWithAdminRole.id,
      roleId: adminRole.id,
    });
    await this.factory(UserRoleFactory).create({
      userId: userWithUserRole.id,
      roleId: userRole.id,
    });
  }
}
