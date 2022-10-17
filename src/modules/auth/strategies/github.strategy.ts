import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-github';
import { githubConfig } from '../../../config/github.config';
import { FederatedService } from '../../federated/federated.service';
import { UserService } from '../../user/user.service';
import { GitHubProfileInterface } from '../interfaces/github-profile.interface';

@Injectable()
export class AuthGithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(githubConfig.KEY)
    private config: ConfigType<typeof githubConfig>,
    private federatedService: FederatedService
  ) {
    super({
      clientID: config?.clientId,
      clientSecret: config?.clientSecret,
      callbackURL: config?.callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfileInterface
  ) {
    const email = profile.emails[0].value;
    if (!email)
      throw new UnauthorizedException('Permission for email not allowed.');

    const user = await this.federatedService.sign('github', email, profile.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
