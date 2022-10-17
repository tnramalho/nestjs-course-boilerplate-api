import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FederatedInterface } from '../interfaces';
import { CommonEntity } from '../../../common/common.entity';

/**
 * Federated DTO
 */
@Exclude()
export class FederatedDto extends CommonEntity implements FederatedInterface {
  /**
   * provider
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'provider of the federated',
  })
  @IsString()
  provider!: string;

  /**
   * subject
   */
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'subject of the federated',
  })
  @IsString()
  providerRef!: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'user of the federated',
  })
  @IsString()
  userId!: string;
}
