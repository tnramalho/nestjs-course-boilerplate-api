import { faker } from '@faker-js/faker';
import { Factory } from '@concepta/typeorm-seeding';
import { User } from './user.entity';

export class UserFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const password = 'Test1234';
    const user = new User();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.username = faker.helpers.unique(faker.internet.userName);
    user.email = faker.helpers.unique(faker.internet.email);
    user.password = password;
    return user;
  }
}
