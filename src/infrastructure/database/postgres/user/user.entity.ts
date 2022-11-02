import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../../common/common.entity';
import { Federated } from '../../../../modules/federated/federated.entity';
import { UserRole } from '../../../../modules/user-role/user-role.entity';
import { UserInterface } from '../../../../core/user/domain/interfaces';
import { CreateUserDto } from '../../../../web/controller/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../web/controller/user/dto/update-user.dto';

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

  static async validate(plainDto: CreateUserDto | UpdateUserDto) {
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
