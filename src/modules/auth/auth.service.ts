import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.usersService.validateUserPassword(
      username,
      password,
    );
    if (!user || !user.active) null;
    return user;
  }

  async generateAuthResponse(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this.config.access;
    const refreshConfig = this.config.refresh;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = await this.jwtService.sign(
      payload,
      accessConfig?.signOptions,
    );

    const refreshToken = await this.jwtService.sign(
      payload,
      refreshConfig?.signOptions,
    );

    return new AuthResponseDto(accessToken, refreshToken);
  }
}
