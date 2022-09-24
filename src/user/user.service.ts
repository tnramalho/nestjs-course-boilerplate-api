import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

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
      relations: ['userRoles'],
    });
    return plainToInstance(UserDto, users);
  }

  private async findById(id: string): Promise<User> {
    // Get without relationships
    const user = await this.repo.findOneBy({
      id,
    });
    // const user = await this.repo.findOne({
    //   where: { id },
    //   relations: ['roles'],
    // });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async findOne(id: string): Promise<UserDto> {
    const user = await this.findById(id);
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
}
