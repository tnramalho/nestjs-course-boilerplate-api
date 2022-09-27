import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: 'string',
    description: 'Username',
  })
  @IsString()
  name!: string;
}
