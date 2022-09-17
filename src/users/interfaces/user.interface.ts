//import { UserRoleInterface } from 'src/modules/user-role/interfaces';

export interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  salt: string;
  active: boolean;
  //userRoles?: UserRoleInterface[];
}
