import { Repository } from 'typeorm';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Federated } from './federated.entity';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class FederatedService {
  constructor(
    @InjectRepository(Federated)
    private repo: Repository<Federated>,
    private userService: UserService
  ) {}

  /**
   * Sign in with federated creating a user if it doesn't exist
   * @param provider - provider name (github, facebook, google)
   * @param email email account
   * @param providerRef - subject (user id/ profile id from provider)
   * @returns email - email of user
   *
   * @return FederatedCredentialsInterface - user information
   */
  async sign(
    provider: string,
    email: string,
    providerRef: string
  ): Promise<UserDto> {
    // check if Federated Exists
    const federated = await this.exists(provider, providerRef);

    // if there is no federated user, create one
    if (!federated) {
      return await this.createUserWithFederated(provider, email, providerRef);
    } else {
      // if there is a user, return it
      const user = await this.userService.findOne(federated.userId);

      if (!user)
        throw new InternalServerErrorException(
          'An account associated with github was not found'
        );

      return user;
    }
  }

  protected async createUserWithFederated(
    provider: string,
    email: string,
    providerRef: string
  ): Promise<UserDto> {
    // Check if user exists by email
    const user = await this.userService.findByEmail(email);

    const userResult = user ? user : await this.createUser(email, email);

    // Create federated
    await this.createFederated(provider, providerRef, userResult.id);

    return userResult;
  }

  /**
   * Create federated credentials
   *
   * @private
   */
  private async createFederated(
    provider: string,
    providerRef: string,
    userId: string
  ): Promise<Federated> {
    try {
      const federated = await this.repo.save({
        provider,
        providerRef,
        userId,
      });

      return federated;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  protected async createUser(
    email: string,
    username: string
  ): Promise<UserDto> {
    try {
      const newUser = await this.userService.create({
        email,
        username,
        password: 'Test1234',
      });

      return newUser;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async exists(provider: string, providerRef: string) {
    try {
      return this.repo.findOne({
        where: {
          provider,
          providerRef,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
