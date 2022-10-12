import { SeedingSource } from '@concepta/typeorm-seeding';
import { UserSeeder } from '../modules/user/user.seeder';
import dataSource from './typeorm-migration.config';

export default new SeedingSource({
  dataSource,
  seeders: [UserSeeder],
});
