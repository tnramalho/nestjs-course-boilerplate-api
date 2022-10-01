import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { AuthLoginDto } from './dto/auth-login-dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: AuthLoginDto,
    description: 'Authenticate user with username and password',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@AuthUser() user: UserDto) {
    return this.authService.generateAuthResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthUser() user: UserDto) {
    return user;
  }
}
