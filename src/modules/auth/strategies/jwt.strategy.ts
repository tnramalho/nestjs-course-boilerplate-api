import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserService } from '../../../web/controller/user/user.service';
import { jwtConfig } from '../../../infrastructure/config/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from '../../../web/controller/user/dto/user.dto';
import { UserInterface } from '../../../core/user/domain/interfaces';

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

  async validate(payload: JwtPayload): Promise<UserInterface> {
    const { sub } = payload;
    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
