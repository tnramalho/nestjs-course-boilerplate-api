import { UserInterface } from './user.interface';

export type UserUpdatableInterface = Partial<
  Pick<UserInterface, 'firstName' | 'lastName' | 'active'>
>;
