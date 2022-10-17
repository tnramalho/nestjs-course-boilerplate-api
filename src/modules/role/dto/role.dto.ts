import { RoleInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';
import { CommonEntityDto } from '../../../common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Exclude()
export class RoleDto extends CommonEntityDto implements RoleInterface {
  @ApiProperty({
    type: 'string',
    description: 'Username',
  })
  @IsString()
  @Expose()
  name!: string;
}
