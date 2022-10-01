import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsStrongPassword } from '../../../common/decorators/is-strong-password';
import { UserCreatableInterface } from '../interfaces';
import { USER_PASSWORD_MIN_LENGTH } from '../constant/user.constants';
import { UserDto } from './user.dto';

export class CreateUserDto
  extends IntersectionType(
    // PickType will pick properties as mandatory
    PickType(UserDto, ['username', 'firstName', 'lastName', 'email']),
    // partial Type will take properties as optional
    PartialType(PickType(UserDto, ['active']))
  )
  implements UserCreatableInterface
{
  @ApiProperty({
    title: 'Password',
    description:
      'A Strong password that must contain at least one number, one capital letter and one lowercase letter',
    minLength: USER_PASSWORD_MIN_LENGTH,
  })
  @IsStrongPassword()
  password!: string;
}
