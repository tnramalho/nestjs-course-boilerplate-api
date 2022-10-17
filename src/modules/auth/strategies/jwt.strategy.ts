import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const { sub } = payload;
    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
