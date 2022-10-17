import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { AppModuleFixture } from './__fixtures__/app.module.fixture';
import { SeedingSource } from '@concepta/typeorm-seeding';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { UserSeeder } from './user.seeder';
import { UserFactory } from './user.factory';
import { User } from './user.entity';
import { newDb } from 'pg-mem';
import { ormConfig } from './__fixtures__/ormconfig.fixture';
import { Repository } from 'typeorm';

describe('UserControllerController (e2e)', () => {
  let app: INestApplication;
  let seedingSource: SeedingSource;
  let userRepository: Repository<User>;
  const DefaultUser: CreateUserDto = {
    username: `${randomUUID()}`,
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe',
    email: `${randomUUID()}@dispostable.com`,
  };

  beforeEach(async () => {
    // Get PG in memory DB connection
    const db = newDb();
    const inMemoryDbConnection = await db.adapters.createTypeormDataSource(
      ormConfig
    );

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleFixture],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useValue(inMemoryDbConnection)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const RepositoryToken = getRepositoryToken(User);
    userRepository = app.get<Repository<User>>(RepositoryToken);

    ///
    /// Seeder
    ///
    seedingSource = new SeedingSource({
      dataSource: app.get(getDataSourceToken()),
    });

    const userSeeder = new UserSeeder({
      factories: [new UserFactory({ entity: User })],
    });

    await seedingSource.run.one(userSeeder);
  });

  afterEach(async () => {
    await userRepository.query('DELETE from "user_role"');
    await userRepository.query('DELETE from "role"');
    await userRepository.query('DELETE from "user"');
  });

  it('POST /Users', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(DefaultUser)
      .expect(201);

    expect(response.body.id).toBeDefined();

    const responseUsers = await request(app.getHttpServer())
      .get(`/users`)
      .expect(200);
    expect(responseUsers.body.length).toBe(3);
  });

  it('GET /Users', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .expect(200);
    expect(response.body.length).toBe(2);
  });

  it('GET /Users/{id}', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .expect(200);

    const randomUserId = response.body[0].id;
    const randomUserName = response.body[0].username;

    return request(app.getHttpServer())
      .get(`/users/${randomUserId}`)
      .expect(200)
      .then(response => {
        expect(response.body.username).toBe(randomUserName);
      });
  });

  it('GET /Users throws 404', async () => {
    await request(app.getHttpServer()).get(`/users/wrong_id`).expect(400);
  });
});
