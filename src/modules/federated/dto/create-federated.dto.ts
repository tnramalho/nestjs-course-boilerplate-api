import { Exclude } from 'class-transformer';
import { PickType } from '@nestjs/swagger';
import { FederatedDto } from './federated.dto';
import { FederatedCreatableInterface } from '../interfaces/federated-creatable.interface';

/**
 * Federated Create DTO
 */
@Exclude()
export class FederatedCreateDto
  extends PickType(FederatedDto, ['provider', 'providerRef', 'userId'])
  implements FederatedCreatableInterface {}
