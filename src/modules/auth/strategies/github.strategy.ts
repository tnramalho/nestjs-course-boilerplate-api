import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-github';
import { githubConfig } from '../../../config/github.config';
import { UserService } from '../../user/user.service';
import { GitHubProfile } from '../interfaces/github-profile.interface';

@Injectable()
export class AuthGithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(githubConfig.KEY)
    private config: ConfigType<typeof githubConfig>,
    private userService: UserService
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
    profile: GitHubProfile
  ) {
    return {
      githubId: profile.id,
      displayName: profile.displayName,
      username: profile.username,
      email: profile.email,
    };
  }
}
