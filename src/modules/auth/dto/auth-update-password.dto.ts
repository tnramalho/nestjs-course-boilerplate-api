import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../../web/controller/user/dto/create-user.dto';

export class AuthUpdatePasswordDto extends PickType(CreateUserDto, [
  'password',
]) {}
