import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module';
import { CreateUserDto } from './modules/user/dto/create-user.dto';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const DefaultUser: CreateUserDto = {
    username: `${randomUUID()}`,
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe',
    email: `${randomUUID()}@dispostable.com`,
  };
  let userId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /Users', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(DefaultUser)
      .expect(201);

    userId = response.body.id;
  });

  it('GET /Users', async () => {
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .then(response => {
        expect(response.body.username).toBe(DefaultUser.username);
      });
  });

  it('remove /Users', async () => {
    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
  });

  it('GET /Users throws 404', async () => {
    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });
});
