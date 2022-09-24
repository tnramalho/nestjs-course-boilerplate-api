import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UserUpdatableInterface } from '../interfaces';

export class UpdateUserDto implements UserUpdatableInterface {
  @ApiProperty({
    type: 'string',
    description: 'FirstName',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    type: 'string',
    description: 'LastName',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: Boolean,
    description: 'active',
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
