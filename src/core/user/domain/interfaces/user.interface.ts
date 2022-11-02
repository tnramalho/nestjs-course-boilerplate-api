import { CommonEntityInterface } from '../../../../common/interfaces';
import { UserRoleInterface } from '../../../../modules/user-role/interfaces';

export interface UserInterface extends CommonEntityInterface {
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
  salt: string;
  active: boolean;
  resetToken: string | null;
  resetTokenExp: Date | null;
  userRoles?: UserRoleInterface[];
}
