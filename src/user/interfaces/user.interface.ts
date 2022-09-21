//import { UserRoleInterface } from 'src/modules/user-role/interfaces';

import { CommonEntityInterface } from '../../common/interfaces';

export interface UserInterface extends CommonEntityInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  salt: string;
  active: boolean;
  //userRoles?: UserRoleInterface[];
}
