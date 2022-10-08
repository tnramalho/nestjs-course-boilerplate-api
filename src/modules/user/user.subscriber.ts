import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  InsertEvent,
  Not,
  UpdateEvent,
} from 'typeorm';
import { FindOperator } from 'typeorm/find-options/FindOperator';

import { BadRequestException } from '@nestjs/common';

import { CryptUtil } from '../../common/utils/crypt.util';
//import { UserRole } from '../user-role/user-role.entity';
//import { Role } from '../role/role.entity';
//import { AppRole } from '../../app.acl';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await this._checkEmailUniqueness(event);
    await this._checkUsernameUniqueness(event);
    await this._hashInsertedPassword(event);
  }

  // async afterInsert(event: InsertEvent<User>) {
  //   //await this._assignDefaultUserRole(event);
  // }

  async beforeUpdate(event: UpdateEvent<User>) {
    await this._checkEmailUniqueness(event);
    await this._checkUsernameUniqueness(event);
    await this._hashUpdatedPassword(event);
  }

  async _hashPassword(user: User) {
    // yes, new salt and hash it
    user.salt = await CryptUtil.generateSalt();
    user.password = await CryptUtil.hashPassword(user.password, user.salt);
  }

  async _hashInsertedPassword(event: InsertEvent<User>) {
    // user being inserted
    const user = event.entity;

    // hash the password
    await this._hashPassword(user);

    // all done
    return;
  }

  async _hashUpdatedPassword(event: UpdateEvent<User>) {
    // user being updated
    const user = event.entity as User;

    // get existing record
    const currentRecord = await event.manager.findOne(User, {
      where: {
        id: user.id,
      },
    });

    // has it changed?
    if (
      currentRecord?.password &&
      user?.password &&
      user.password !== currentRecord.password
    ) {
      // yes, hash the password
      await this._hashPassword(user);
    }

    // all done
    return;
  }

  async _checkEmailUniqueness(event: InsertEvent<User> | UpdateEvent<User>) {
    // user being inserted
    const user = event.entity;

    // does user have email set?
    if (user?.email) {
      // build the criteria
      const criteria: {
        where: {
          id?: FindOperator<string>;
          email: FindOperator<string>;
        };
      } = {
        where: {
          email: Equal(user.email),
        },
      };
      // if user exists, skip own id
      if (user.id) {
        criteria.where.id = Not(user.id);
      }
      // query for count of users with exact e-mail address
      const count = await event.manager.count(User, criteria);
      // if any found, a foreign key violation would occur
      if (count > 0) {
        throw new BadRequestException('Email address already exists.');
      } else {
        return;
      }
    } else {
      return;
    }
  }

  async _checkUsernameUniqueness(event: InsertEvent<User> | UpdateEvent<User>) {
    // user being inserted
    const user = event.entity;

    // does user have email set?
    if (user?.username) {
      // build the criteria
      const criteria: {
        where: {
          id?: FindOperator<string>;
          username: FindOperator<string>;
        };
      } = {
        where: {
          username: Equal(user.username),
        },
      };
      // if user exists, skip own id
      if (user.id) {
        criteria.where.id = Not(user.id);
      }
      // query for count of users with exact e-mail address
      const count = await event.manager.count(User, criteria);
      // if any found, a foreign key violation would occur
      if (count > 0) {
        throw new BadRequestException('Username already exists.');
      } else {
        return;
      }
    } else {
      return;
    }
  }

  //   async _assignDefaultUserRole(event: InsertEvent<User>) {
  //     // get the user that was inserted
  //     const user = event.entity;

  //     // already has roles?
  //     if (Array.isArray(user.userRoles) && user.userRoles.length) {
  //       // yes, leave roles alone
  //       return;
  //     }

  //     // find the role
  //     const defaultUserRole = await event.manager.findOne<Role>(Role, {
  //       name: AppRole.User,
  //     });

  //     // did we get the role?
  //     if (defaultUserRole) {
  //       // assign the role to the user
  //       const userRole = event.manager.create<UserRole>(UserRole, {
  //         user,
  //         role: defaultUserRole,
  //       });
  //       // save it
  //       await event.manager.save(userRole);
  //     } else {
  //       throw new InternalServerErrorException(
  //         'Failed to find default role to assign to new user.'
  //       );
  //     }
  //   }
}
