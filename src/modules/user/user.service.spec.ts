import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

describe(UserService, () => {
  let service: UserService;
  let repository: Repository<User>;
  const wrongId = 'wrong_id';
  let DefaultUser: User;
  let DefaultUserDto: CreateUserDto;

  beforeEach(async () => {
    const mockRepository = mock<Repository<User>>();
    const RepositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RepositoryToken,
          useValue: mockRepository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(RepositoryToken);

    DefaultUser = {
      id: 'randomId',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'john',
      password: 'Test1234',
      firstName: 'John',
      lastName: 'Doe',
      email: `${randomUUID()}@dispostable.com`,
      salt: 'saltHash',
      active: true,
    };

    DefaultUserDto = {
      ...DefaultUser,
    };

    jest.spyOn(repository, 'create').mockReturnValue(DefaultUser);
    jest.spyOn(repository, 'save').mockResolvedValue(DefaultUser);
    jest.spyOn(repository, 'find').mockResolvedValue([DefaultUser]);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(DefaultUser);
    jest.spyOn(repository, 'remove');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('should success', async () => {
      const user = await service.create(DefaultUserDto);

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUserDto.firstName);
    });
  });

  describe(UserService.prototype.update, () => {
    it('should success', async () => {
      let user = await service.create(DefaultUserDto);
      const newFirstName = 'myNewName';
      user = await service.update(user.id, {
        firstName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.lastName).toBe(DefaultUserDto.lastName);
      expect(user.firstName).toBe(newFirstName);
    });
    it('should success', async () => {
      let user = await service.create(DefaultUserDto);
      const newFirstName = 'myNewName';
      user = await service.update(user.id, {
        lastName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUserDto.firstName);
      expect(user.lastName).toBe(newFirstName);
    });
  });

  describe(UserService.prototype.findAll, () => {
    it('should be success with default', async () => {
      const users = await service.findAll();
      expect(users.length).toBe(1);
    });

    it('should be success with empty return', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const users = await service.findAll();
      expect(users.length).toBe(0);
    });

    it('should be success with 2 users', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([DefaultUser, DefaultUser]);
      const users = await service.findAll();
      expect(users.length).toBe(2);
    });
  });

  describe(UserService.prototype.findOne, () => {
    it('should success', async () => {
      const user = await service.create(DefaultUserDto);
      const userFound = await service.findOne(user.id);
      expect(userFound.id).toBe(user.id);
    });

    it('should fail', () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => null);
      const t = async () => {
        await service.findOne(wrongId);
      };
      expect(t).rejects.toThrow(NotFoundException);
    });
  });

  describe(UserService.prototype.remove, () => {
    it('should Success', async () => {
      const id = randomUUID();
      service.remove(id);
    });

    it('should Throw', () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => null);

      const toThrow = async () => {
        await service.remove(wrongId);
      };
      expect(toThrow).rejects.toThrow(NotFoundException);
    });
  });
});
