import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UUIDParam } from '../../common/decorators/is-uuid-param';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { AuthEmailDto } from './dto/auth-email.dto';
import { AuthLoginDto } from './dto/auth-login-dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthUpdatePasswordDto } from './dto/auth-update-password.dto';
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
  login(@AuthUser() user: UserDto): Promise<AuthResponseDto> {
    return this.authService.jwtSign(user);
  }

  @ApiBearerAuth()
  @Post('/refresh')
  @ApiOperation({ operationId: 'auth_refresh' })
  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  refresh(@Body() authRefreshDto: AuthRefreshDto): Promise<AuthResponseDto> {
    return this.authService.jwtRefresh(authRefreshDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthUser() user: UserDto) {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    description:
      'Generate a reset token and send email to the user, if email exists.',
    operationId: 'auth_resetPassword',
  })
  @ApiResponse({
    status: 200,
    description:
      'Success is returned even if email not found for security reasons.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  forgotPassword(@Body() authEmailDto: AuthEmailDto): Promise<void> {
    return this.authService.forgotPassword(authEmailDto.email);
  }

  @Patch(':resetToken/reset-password')
  @ApiOperation({
    description: 'If resetToken exists and is still valid, update password.',
    operationId: 'auth_resetUpdatePassword',
  })
  @ApiParam({
    name: 'resetToken',
    description: 'The reset token',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Password was changed successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 404,
    description: 'Token does not exist or has expired.',
  })
  resetUpdatePassword(
    @UUIDParam('resetToken') resetToken: string,
    @Body() authUpdatePasswordDto: AuthUpdatePasswordDto
  ): Promise<void> {
    return this.authService.updatePassword(resetToken, authUpdatePasswordDto);
  }
}
