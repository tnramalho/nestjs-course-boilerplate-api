import { UserCreatableInterface } from '../interfaces';

export class CreateUserDto implements UserCreatableInterface {
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
}
