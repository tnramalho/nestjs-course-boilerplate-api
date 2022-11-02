import { Inject, Injectable } from '@nestjs/common';
import { UserCreatableInterface, UserInterface } from '../domain/interfaces';
import { UserRepositoryInterface } from '../domain/user-repository.interface';
import { USER_REPOSITORY } from '../infrastructure/constants/use-case.constants';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private repo: UserRepositoryInterface
  ) {}

  public async execute(
    createUser: UserCreatableInterface
  ): Promise<UserInterface> {
    const user = this.repo.create(createUser);
    const dbUser = await this.repo.save(user);
    return dbUser;
  }
}
