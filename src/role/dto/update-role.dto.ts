import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    type: 'string',
    description: 'Username',
  })
  @IsString()
  name!: string;
}
