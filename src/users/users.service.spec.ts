import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe(UsersService, () => {
  let service: UsersService;
  const DefaultUser: CreateUserDto = {
    username: 'john',
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@dispostable.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UsersService.prototype.create, () => {
    it('should success', () => {
      const user = service.create(DefaultUser);

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUser.firstName);
    });
  });

  describe(UsersService.prototype.update, () => {
    it('should success', () => {
      let user = service.create(DefaultUser);
      const newFirstName = 'myNewName';
      user = service.update(user.id, {
        firstName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.lastName).toBe(DefaultUser.lastName);
      expect(user.firstName).toBe(newFirstName);
    });
    it('should success', () => {
      let user = service.create(DefaultUser);
      const newFirstName = 'myNewName';
      user = service.update(user.id, {
        lastName: newFirstName,
      });

      expect(user.id).toBeDefined();
      expect(user.firstName).toBe(DefaultUser.firstName);
      expect(user.lastName).toBe(newFirstName);
    });
  });

  describe(UsersService.prototype.findAll, () => {
    it('should be success with empty return', () => {
      const users = service.findAll();
      expect(users.length).toBe(0);
    });

    it('should be success with 2 users', () => {
      service.create(DefaultUser);
      service.create(DefaultUser);
      const users = service.findAll();
      expect(users.length).toBe(2);
    });
  });

  describe(UsersService.prototype.findOne, () => {
    it('should success', () => {
      const user = service.create(DefaultUser);
      const userFound = service.findOne(user.id);
      expect(userFound.id).toBe(user.id);
    });

    it('should fail', () => {
      const wrongId = 'wrong_id';
      const t = () => {
        service.findOne(wrongId);
      };
      expect(t).toThrow(NotFoundException);
    });
  });

  describe(UsersService.prototype.remove, () => {
    it('should Success', () => {
      const user = service.create(DefaultUser);
      const userFound = service.findOne(user.id);

      // Make sure found user
      expect(userFound.id).toBe(user.id);

      service.remove(userFound.id);

      // make sure user was removed
      const toThrow = () => {
        service.findOne(userFound.id);
      };
      expect(toThrow).toThrow(NotFoundException);
    });

    it('should Throw', () => {
      const wrongId = 'wrongID';
      const toThrow = () => {
        service.remove(wrongId);
      };
      expect(toThrow).toThrow(NotFoundException);
    });
  });

  // To test a private method you can access it like service['convertToUser']
  describe(UsersService.prototype['convertToUser'], () => {
    it('should Success', () => {
      const user = service['convertToUser'](DefaultUser);
      expect(user).toBeInstanceOf(User);
    });
  });
});
