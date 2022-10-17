import { Exclude } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

import { FederatedDto } from './federated.dto';
import { FederatedUpdatableInterface } from '../interfaces/federated-updatable.interface';

/**
 * Federated Update DTO
 */
@Exclude()
export class FederatedUpdateDto
  extends PickType(FederatedDto, ['provider', 'providerRef'] as const)
  implements FederatedUpdatableInterface {}
