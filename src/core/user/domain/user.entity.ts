import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/common.entity';
import { UserRole } from '../../../modules/user-role/user-role.entity';
import { Federated } from '../../../modules/federated/federated.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import {
  UserCreatableInterface,
  UserInterface,
  UserUpdatableInterface,
} from './interfaces';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext', nullable: false })
  username!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt!: string;

  @Column({ type: 'citext', nullable: true })
  firstName!: string;

  @Column({ type: 'citext', nullable: true })
  lastName!: string;

  @Column({ type: 'citext', nullable: true })
  email!: string;

  @Column({ default: true, nullable: false })
  active!: boolean;

  @Column({ type: 'uuid', nullable: true })
  resetToken!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExp!: Date | null;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => Federated, federated => federated.user)
  federated?: Federated[];

  static async validate(
    plainDto: UserCreatableInterface | UserUpdatableInterface
  ) {
    // convert to dto
    const dto = plainToInstance(User, plainDto);

    // validate the data
    const validationErrors = await validate(dto);

    // any errors?
    if (validationErrors.length) {
      // yes, throw error
      throw new BadRequestException(validationErrors);
    }

    return dto;
  }
}
