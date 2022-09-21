import { UserCreatableInterface } from '../interfaces';
import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
