import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EMAIL_TEMPLATE_RESET_PASSWORD } from '../../common/constants';
import { authConfig } from '../../config/auth.config';
import { jwtConfig } from '../../config/jwt.config';
import { EmailService } from '../email/email.service';
import { EmailOptionsInterface } from '../email/interfaces/email-options.interface';
import { LoggerService } from '../logger/logger.service';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthUpdatePasswordDto } from './dto/auth-update-password.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private _authConfig: ConfigType<typeof authConfig>,
    @Inject(jwtConfig.KEY)
    private _jwtConfig: ConfigType<typeof jwtConfig>,
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext(AuthService.name);
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.userService.validateUserPassword(
      username,
      password
    );
    if (!user || !user.active) null;
    return user;
  }

  async jwtSign(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this._jwtConfig.access;
    const refreshConfig = this._jwtConfig.refresh;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = await this.jwtService.sign(
      payload,
      accessConfig?.signOptions
    );

    const refreshToken = await this.jwtService.sign(
      payload,
      refreshConfig?.signOptions
    );

    return new AuthResponseDto(accessToken, refreshToken);
  }

  async jwtRefresh(authRefreshDto: AuthRefreshDto): Promise<AuthResponseDto> {
    const refreshConfig = this._jwtConfig.refresh;

    const verified = await this.jwtService.verifyAsync<JwtPayload>(
      authRefreshDto.refreshToken,
      refreshConfig?.verifyOptions
    );

    if (verified) {
      const id = verified.sub;
      const user = await this.userService.findOne(id);
      return this.jwtSign(user);
    }

    throw new UnauthorizedException();
  }

  /**
   * Update reset token and token exp and send a email if user is in our records
   *
   * @param authResetPasswordDto
   * @return void
   */
  async forgotPassword(email: string): Promise<void> {
    // update user if it does exists and return it
    const user = await this.updateResetTokenIfValid(email);

    if (!user) return;

    const template = EMAIL_TEMPLATE_RESET_PASSWORD;

    // build the object with data information to be populated in the email template
    const emailOptions: EmailOptionsInterface = {
      to: user.email,
      subject: 'Reset Password',
      template: template,
      context: {
        tokenUrl: `${user?.resetToken}`,
        tokenExp:
          user?.resetTokenExp instanceof Date
            ? user.resetTokenExp.toUTCString()
            : '',
      },
    };

    await this.emailService.send(emailOptions);

    // don't return anything for security reasons
    return;
  }

  private ttlConfig() {
    // get the ttl and nodemailer configs
    const ttl = this._authConfig.resetToken.ttl;

    if (!ttl) {
      throw new InternalServerErrorException(
        'Service unavailable, reset ttl not configured properly!'
      );
    }

    return ttl;
  }

  private async updateResetTokenIfValid(email: string): Promise<User | null> {
    // get the ttl and nodemailer configs
    const ttl = this.ttlConfig();

    // update user if it does exists and return it
    const user = await this.userService.updateResetTokenByEmail(email, ttl);

    // if no user or no user email, fail silently
    if (!user || !user.email) {
      this.loggerService.debug('user with invalid token or with no email');
      return null;
    }

    return user;
  }

  /**
   * If token exists and is still valid, update password.
   */
  async updatePassword(
    token: string,
    authUpdatePasswordDto: AuthUpdatePasswordDto
  ): Promise<void> {
    // call user service
    await this.userService.updatePassword(
      token,
      authUpdatePasswordDto.password
    );
    // don't return anything
    return;
  }
}
