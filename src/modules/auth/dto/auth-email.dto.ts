import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class AuthEmailDto extends PickType(UserDto, ['email']) {}
