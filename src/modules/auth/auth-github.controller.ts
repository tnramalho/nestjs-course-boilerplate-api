import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { GithubAuthGuard } from './guards/github-auth-guard';

@Controller('auth/github')
@ApiTags('auth')
export class AuthGithubController {
  constructor(private authService: AuthService) {}

  /**
   * Login
   */
  @ApiOkResponse({
    description: 'Users are redirected to request their GitHub identity.',
  })
  @UseGuards(GithubAuthGuard)
  @Get('')
  login(): void {
    // TODO: no code needed, Decorator will redirect to github
    return;
  }

  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'DTO containing an access token and a refresh token.',
  })
  @UseGuards(GithubAuthGuard)
  @Get('callback')
  async get(@AuthUser() user: UserDto) {
    return this.authService.jwtSign(user);
  }
}
