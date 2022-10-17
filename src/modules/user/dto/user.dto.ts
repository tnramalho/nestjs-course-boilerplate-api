import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { UserRoleDto } from '../../user-role/dto/user-role.dto';
import { UserInterface } from '../interfaces';
import { CommonEntityDto } from '../../../common/dto';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
} from '../constant/user.constants';

@Exclude()
export class UserDto
  extends CommonEntityDto
  implements
    Omit<UserInterface, 'salt' | 'password' | 'resetToken' | 'resetTokenExp'>
{
  @ApiProperty({
    title: 'Username',
    description: 'The username of user.',
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  @Expose()
  username!: string;

  @ApiProperty({
    title: 'First Name',
    description: 'The first name of user.',
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  @Expose()
  firstName?: string;

  @ApiProperty({
    title: 'Last Name',
    description: 'The last name of user.',
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  @Expose()
  lastName?: string;

  @ApiProperty({
    title: 'Email',
    description: 'The email user.',
    minLength: USER_EMAIL_MIN_LENGTH,
    maxLength: USER_EMAIL_MAX_LENGTH,
  })
  @IsEmail()
  @MinLength(USER_EMAIL_MIN_LENGTH)
  @MaxLength(USER_EMAIL_MAX_LENGTH)
  @Expose()
  email!: string;

  @ApiProperty({
    title: 'Active',
    description: 'The flag to inform if user is active or not.',
  })
  @Expose()
  @IsBoolean()
  @Type(() => Boolean)
  active!: boolean;

  @ApiProperty({
    type: [UserRoleDto],
    description: 'roles',
    required: false,
  })
  @Expose()
  @Transform(({ value }) => {
    return value?.map((role: UserRoleDto) => {
      return role?.role?.name;
    });
  })
  userRoles!: UserRoleDto[];

  @Expose()
  resetToken!: string;
  @Expose()
  resetTokenExp!: Date;
}
