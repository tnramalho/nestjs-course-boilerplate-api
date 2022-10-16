//import { UserRoleInterface } from 'src/modules/user-role/interfaces';

import { CommonEntityInterface } from '../../../common/interfaces';
import { UserRoleInterface } from '../../user-role/interfaces';

export interface UserInterface extends CommonEntityInterface {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  salt: string;
  active: boolean;
  resetToken: string | null;
  resetTokenExp: Date | null;
  userRoles?: UserRoleInterface[];
}
