//import { UserFederatedInterface } from 'src/modules/user-federated/interfaces';

import { CommonEntityInterface } from '../../../common/interfaces';

export interface FederatedInterface extends CommonEntityInterface {
  /**
   * Provider name (github, facebook, etc)
   */
  provider: string;

  /**
   * The reference identification for provider
   */
  providerRef: string;

  /**
   * The user federated will be associated to
   */
  userId: string;
}
