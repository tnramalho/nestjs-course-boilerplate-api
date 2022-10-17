import { faker } from '@faker-js/faker';
import { Factory } from '@concepta/typeorm-seeding';
import { Role } from './role.entity';

export class RoleFactory extends Factory<Role> {
  protected async entity(): Promise<Role> {
    const role = new Role();
    return role;
  }
}
