import { DataSource } from 'typeorm';
import { Federated } from '../modules/federated/federated.entity';
import { Role } from '../modules/role/role.entity';
import { UserRole } from '../modules/user-role/user-role.entity';
import { User } from '../modules/user/user.entity';
import { UserSubscriber } from '../modules/user/user.subscriber';

const dbSSL =
  'string' === typeof process.env.DATABASE_SSL
    ? process.env.DATABASE_SSL === 'true'
    : process.env.DATABASE_SSL || false;

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : 'postgresql://postgres:postgres@localhost:5432/nestjscourse',
  migrationsRun:
    'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
      ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
      : false,
  entities: [User, Role, UserRole, Federated],
  subscribers: [UserSubscriber],
  synchronize:
    'string' === typeof process.env.DATABASE_SYNCHRONIZE
      ? process.env.DATABASE_SYNCHRONIZE === 'true'
      : false,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  logging: true,
  ssl: dbSSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});
