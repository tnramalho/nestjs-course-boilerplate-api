import { CommonEntityInterface } from '../../../common/interfaces';

export interface UserRoleInterface extends CommonEntityInterface {
  userId: string;
  roleId: string;
}
