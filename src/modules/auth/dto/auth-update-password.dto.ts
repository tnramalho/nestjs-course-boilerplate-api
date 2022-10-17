import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class AuthUpdatePasswordDto extends PickType(CreateUserDto, [
  'password',
]) {}
