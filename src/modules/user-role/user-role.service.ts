import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private repo: Repository<UserRole>
  ) {}

  public async create(createUserRole: CreateUserRoleDto): Promise<UserRoleDto> {
    const userRole = this.repo.create(createUserRole);
    const dbUserRole = await this.repo.save(userRole);
    return plainToInstance(UserRoleDto, dbUserRole);
  }

  public async findAll(): Promise<UserRoleDto[]> {
    const userRoles = await this.repo.find();
    return plainToInstance(UserRoleDto, userRoles);
  }

  private async findById(id: string): Promise<UserRole> {
    const userRole = await this.repo.findOneBy({
      id,
    });
    if (!userRole) throw new NotFoundException();
    return userRole;
  }

  public async findOne(id: string): Promise<UserRoleDto> {
    const userRole = await this.findById(id);
    return plainToInstance(UserRoleDto, userRole);
  }

  public async remove(id: string): Promise<void> {
    const userRole = await this.findById(id);
    await this.repo.remove(userRole);
  }
}
