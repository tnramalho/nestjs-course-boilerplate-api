import { UserUpdatableInterface } from '../interfaces';

export class UpdateUserDto implements UserUpdatableInterface {
  firstName?: string;
  lastName?: string;
  active?: boolean;
}
