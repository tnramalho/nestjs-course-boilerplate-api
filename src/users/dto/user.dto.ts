import { UserInterface } from '../interfaces';

export class UserDto implements UserInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}
