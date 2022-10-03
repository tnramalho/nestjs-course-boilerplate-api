import { DataSource } from 'typeorm';
import { Role } from '../modules/role/role.entity';
import { UserRole } from '../modules/user-role/user-role.entity';
import { User } from '../modules/user/user.entity';
import { UserSubscriber } from '../modules/user/user.subscriber';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : 'postgresql://postgres:postgres@localhost:5432/nestjscourse',
  migrationsRun:
    'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
      ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
      : false,
  entities: [User, Role, UserRole],
  subscribers: [UserSubscriber],
  synchronize:
    'string' === typeof process.env.DATABASE_SYNCHRONIZE
      ? process.env.DATABASE_SYNCHRONIZE === 'true'
      : false,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  logging: true,
});
