import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../domain/interfaces';
import { UserRepositoryInterface } from '../domain/user-repository.interface';
import { USER_REPOSITORY } from '../infrastructure/constants/use-case.constants';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private repo: UserRepositoryInterface
  ) {}

  public async execute(): Promise<UserInterface[]> {
    const users = await this.repo.find({
      relations: ['userRoles.role'],
    });
    return users;
  }
}
