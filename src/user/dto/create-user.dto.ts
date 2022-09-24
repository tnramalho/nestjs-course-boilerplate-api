import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IsStrongPassword } from '../../common/decorators/is-strong-password';
import { UserCreatableInterface } from '../interfaces';

export class CreateUserDto implements UserCreatableInterface {
  @ApiProperty({
    type: 'string',
    description: 'Username',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  @IsString()
  @IsStrongPassword()
  password!: string;

  @ApiProperty({
    type: 'string',
    description: 'FirstName',
  })
  @IsString()
  @IsOptional()
  firstName!: string;

  @ApiProperty({
    type: 'string',
    description: 'LastName',
  })
  @IsString()
  @IsOptional()
  lastName!: string;

  @ApiProperty({
    type: 'string',
    description: 'Email',
  })
  @IsEmail()
  email!: string;
}
