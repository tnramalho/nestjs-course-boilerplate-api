import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe(UserService, () => {
  let service: UserService;
  const DefaultUser: CreateUserDto = {
    username: 'john',
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@dispostable.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('should success', async () => {
      const user = await service.create(DefaultUser);

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUser.firstName);
    });
  });

  describe(UserService.prototype.update, () => {
    it('should success', async () => {
      let user = await service.create(DefaultUser);
      const newFirstName = 'myNewName';
      user = await service.update(user.id, {
        firstName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.lastName).toBe(DefaultUser.lastName);
      expect(user.firstName).toBe(newFirstName);
    });
    it('should success', async () => {
      let user = await service.create(DefaultUser);
      const newFirstName = 'myNewName';
      user = await service.update(user.id, {
        lastName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUser.firstName);
      expect(user.lastName).toBe(newFirstName);
    });
  });

  describe(UserService.prototype.findAll, () => {
    it('should be success with empty return', async () => {
      const users = await service.findAll();
      expect(users.length).toBe(0);
    });

    it('should be success with 2 users', async () => {
      service.create(DefaultUser);
      service.create(DefaultUser);
      const users = await service.findAll();
      expect(users.length).toBe(2);
    });
  });

  describe(UserService.prototype.findOne, () => {
    it('should success', async () => {
      const user = await service.create(DefaultUser);
      const userFound = await service.findOne(user.id);
      expect(userFound.id).toBe(user.id);
    });

    it('should fail', () => {
      const wrongId = 'wrong_id';
      const t = () => {
        service.findOne(wrongId);
      };
      expect(t).rejects.toThrow(NotFoundException);
    });
  });

  describe(UserService.prototype.remove, () => {
    it('should Success', async () => {
      const user = await service.create(DefaultUser);
      const userFound = await service.findOne(user.id);

      // Make sure found user
      expect(userFound.id).toBe(user.id);

      service.remove(userFound.id);

      // make sure user was removed
      const toThrow = () => {
        service.findOne(userFound.id);
      };
      expect(toThrow).rejects.toThrow(NotFoundException);
    });

    it('should Throw', () => {
      const wrongId = 'wrongID';
      const toThrow = () => {
        service.remove(wrongId);
      };
      expect(toThrow).rejects.toThrow(NotFoundException);
    });
  });
});
