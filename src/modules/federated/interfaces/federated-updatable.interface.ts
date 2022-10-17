import { FederatedInterface } from './federated.interface';

export type FederatedUpdatableInterface = Pick<
  FederatedInterface,
  'provider' | 'providerRef'
>;
