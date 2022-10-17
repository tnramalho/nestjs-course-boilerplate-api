import { registerAs } from '@nestjs/config';
import { GITHUB_MODULE_CONFIG } from '../common/constants';
import { GithubConfigInterface } from '../common/interfaces/github-config.interface';

export const githubConfig = registerAs(
  GITHUB_MODULE_CONFIG,
  (): GithubConfigInterface => ({
    clientId: process.env.GITHUB_CLIENT_ID ?? 'client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? 'secret',
    callbackURL: process.env.GITHUB_CALLBACK_URL ?? 'callback_url',
  })
);
