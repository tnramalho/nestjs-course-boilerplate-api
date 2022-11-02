import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  UserCreatableInterface,
  UserInterface,
  UserUpdatableInterface,
} from '../../../core/user/domain/interfaces';
import { CreateUserUseCase } from '../../../core/user/use-case/create-user.use-case';
import { FindAllUserUseCase } from '../../../core/user/use-case/final-all-user.use-case';

@Injectable()
export class UserService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUserUseCase: FindAllUserUseCase
  ) {}

  public async create(
    createUser: UserCreatableInterface
  ): Promise<UserInterface> {
    return this.createUserUseCase.execute(createUser);
  }

  public async findAll(): Promise<UserInterface[]> {
    return this.findAllUserUseCase.execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async findById(id: string): Promise<UserInterface> {
    throw new NotImplementedException();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findOne(id: string): Promise<UserInterface> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findByEmail(email: string): Promise<UserInterface | null> {
    throw new NotImplementedException();
  }

  public async update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserDto: UserUpdatableInterface
  ): Promise<UserInterface> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async remove(id: string): Promise<void> {
    throw new NotImplementedException();
  }

  /**
   * Get user based on username or email and validate password
   *
   * @param AuthCredentialsDto
   * @return User if password is valid
   * @return null if password is not valid
   */
  async validateUserPassword(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    username: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Promise<UserInterface | null> {
    throw new NotImplementedException();
  }

  /**
   * Generate a new token for resetToken and
   * add expiration Token date
   *
   * @param email email to try to find the user
   * @param ttlMinutes times in minutes of how long token will be expired
   * @return Promise<User>
   */
  async updateResetTokenByEmail(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ttlMinutes: number
  ): Promise<UserInterface | undefined> {
    throw new NotImplementedException();
  }

  /**
   * Update password if resetToken is valid
   *
   * @param resetToken rest Token that was sent to the email
   * @return Promise<User | null>
   */
  async updatePassword(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetToken: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Promise<UserInterface | null> {
    throw new NotImplementedException();
  }

  /**
   * Generate a new reset token and save it on user with its expiration date
   *
   * @return User with new info
   * @param user
   * @param ttlMinutes
   */
  private async updateResetToken(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: UserInterface,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ttlMinutes: number
  ): Promise<UserInterface | undefined> {
    throw new NotImplementedException();
  }
}
