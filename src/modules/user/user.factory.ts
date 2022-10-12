import { faker } from '@faker-js/faker';
import { Factory } from '@concepta/typeorm-seeding';
import { CryptUtil } from '../../common/utils/crypt.util';
import { User } from './user.entity';

export class UserFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const password = 'Test1234';
    const user = new User();
    user.id = faker.datatype.uuid();
    user.createdAt = faker.datatype.datetime();
    user.updatedAt = faker.datatype.datetime();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = password;
    return user;
  }

  protected async finalize(user: User): Promise<void> {
    // last chance to mutate the entity at end of factory lifecycle
  }
}
