import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CommonEntityDto } from '../../common/dto';
import { UserRoleInterface } from '../interfaces';

export class UserRoleDto extends CommonEntityDto implements UserRoleInterface {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleId!: string;
}
