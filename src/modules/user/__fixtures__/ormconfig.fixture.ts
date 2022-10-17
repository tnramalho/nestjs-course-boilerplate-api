import { DataSourceOptions } from 'typeorm';
import { Federated } from '../../federated/federated.entity';
import { Role } from '../../role/role.entity';
import { UserRole } from '../../user-role/user-role.entity';
import { User } from '../user.entity';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  entities: [User, UserRole, Role, Federated],
};
