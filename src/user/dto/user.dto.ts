import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { UserRoleDto } from '../../user-role/dto/user-role.dto';
import { UserInterface } from '../interfaces';
import { CommonEntityDto } from '../../common/dto';

@Exclude()
export class UserDto
  extends CommonEntityDto
  implements Omit<UserInterface, 'salt' | 'password'>
{
  @Expose()
  username!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  active!: boolean;

  @ApiProperty({
    type: [UserRoleDto],
    description: 'roles',
  })
  @Expose()
  userRoles!: UserRoleDto[];
}
