import { UserInterface } from './user.interface';

export interface UserCreatableInterface
  extends Pick<
      UserInterface,
      'firstName' | 'lastName' | 'username' | 'email' | 'password'
    >,
    Partial<Pick<UserInterface, 'active'>> {
  validate?(): Promise<void>;
}
