import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { CryptUtil } from '../../common/utils/crypt.util';
import { LoggerService } from '../logger/logger.service';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

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
    try {
      const user = this.repo.create(createUser);
      const dbUser = await this.repo.save(user);
      return plainToInstance(UserDto, dbUser);
    } catch (e) {
      throw new InternalServerErrorException('Error trying to create a user');
    }
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

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
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
}
