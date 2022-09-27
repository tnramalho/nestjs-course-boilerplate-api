import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.usersService.validateUserPassword(
      username,
      password
    );
    if (!user || !user.active) null;
    return user;
  }
}
