import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { AuthUser } from './decorator/auth-user.decorator';
import { AuthLoginDto } from './dto/auth-login-dto';
import { LocalAuthGuard } from './local-auth-guard';

@Controller('auth')
export class AuthController {
  @ApiBody({
    type: AuthLoginDto,
    description: 'Authenticate user with username and password',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@AuthUser() user: UserDto) {
    return user;
  }
}
