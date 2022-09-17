import { UserInterface } from '../interfaces';

export class User implements UserInterface {
  id: string;
  username: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}
