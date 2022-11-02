import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../../web/controller/user/dto/user.dto';

export class AuthEmailDto extends PickType(UserDto, ['email']) {}
