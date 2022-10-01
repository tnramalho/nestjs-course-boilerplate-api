import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { UserUpdatableInterface } from '../interfaces';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';

export class UpdateUserDto
  extends IntersectionType(
    PartialType(PickType(UserDto, ['firstName', 'lastName', 'active'])),
    PartialType(PickType(CreateUserDto, ['password']))
  )
  implements UserUpdatableInterface {}
