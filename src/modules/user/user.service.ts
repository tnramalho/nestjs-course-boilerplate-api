import { plainToInstance } from 'class-transformer';
import { MoreThanOrEqual, Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { CryptUtil } from '../../common/utils/crypt.util';
import { LoggerService } from '../logger/logger.service';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private context: string;
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private loggerService: LoggerService
  ) {
    this.context = this.constructor.name;
  }

  public async create(createUser: CreateUserDto): Promise<UserDto> {
    const user = this.repo.create(createUser);
    const dbUser = await this.repo.save(user);
    return plainToInstance(UserDto, dbUser);
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.repo.find({
      relations: ['userRoles.role'],
    });
    return plainToInstance(UserDto, users);
  }

  private async findById(id: string): Promise<User> {
    // Get without relationships
    const user = await this.repo.findOne({
      where: { id },
      relations: ['userRoles.role'],
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findOne(id: string): Promise<UserDto> {
    const user = await this.findById(id);
    return plainToInstance(UserDto, user);
  }

  public async findByEmail(email: string): Promise<UserDto> {
    const user = await this.repo.findOne({
      where: { email },
    });
    return plainToInstance(UserDto, user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const user = await this.findById(id);
    const newUser: User = {
      ...user,
      ...updateUserDto,
    };
    this.repo.save(newUser);
    return plainToInstance(UserDto, newUser);
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.repo.remove(user);
  }

  /**
   * Get user based on username or email and validate password
   *
   * @param AuthCredentialsDto
   * @return User if password is valid
   * @return null if password is not valid
   */
  async validateUserPassword(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    // get the username
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });

    // if user exists and has a valid password
    if (
      user &&
      (await CryptUtil.validatePassword(password, user.password, user.salt))
    ) {
      return plainToInstance(UserDto, user);
    } else {
      this.loggerService.debug(
        `Password was not valid for user ${user?.username}`,
        this.context
      );
      return null;
    }
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
    email: string,
    ttlMinutes: number
  ): Promise<User | undefined> {
    // try to find the user by email
    const user = await this.repo.findOne({ where: { email } });

    if (user) {
      return this.updateResetToken(user, ttlMinutes);
    } else {
      return;
    }
  }

  /**
   * Update password if resetToken is valid
   *
   * @param resetToken rest Token that was sent to the email
   * @return Promise<User | null>
   */
  async updatePassword(
    resetToken: string,
    password: string
  ): Promise<User | null> {
    // lookup user by reset token and get user with token not expired
    const user = await this.repo.findOne({
      where: {
        resetToken,
        resetTokenExp: MoreThanOrEqual<Date>(new Date()),
      },
    });

    // got a user?
    if (user) {
      // yes, set the new password and overwrite token and exp
      user.password = password;
      user.resetToken = null;
      user.resetTokenExp = null;
      // try to save it
      try {
        return this.repo.save(user);
      } catch (error) {
        throw new InternalServerErrorException(
          'Updating user password failed.'
        );
      }
    } else {
      throw new NotFoundException('Invalid token');
    }
  }

  /**
   * Generate a new reset token and save it on user with its expiration date
   *
   * @return User with new info
   * @param user
   * @param ttlMinutes
   */
  private async updateResetToken(
    user: User,
    ttlMinutes: number
  ): Promise<User | undefined> {
    // current date
    const now = new Date();

    // new user token is a random uuid
    user.resetToken = randomUUID();

    // set the token expiration date
    user.resetTokenExp = new Date(now.getTime() + ttlMinutes * 60 * 1000);

    // call repo to persist it
    return this.repo.save(user);
  }
}
