import { FederatedInterface } from './federated.interface';

export type FederatedCreatableInterface = Pick<
  FederatedInterface,
  'provider' | 'providerRef' | 'userId'
>;
