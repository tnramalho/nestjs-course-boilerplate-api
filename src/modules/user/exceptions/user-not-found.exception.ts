import { NotFoundException } from '@nestjs/common';
import { ErrorCodeExceptionInterface } from '../../../common/interfaces/error-code-exception.interface';

export class UserNotFoundException
  extends NotFoundException
  implements ErrorCodeExceptionInterface
{
  errorCode!: string;
  constructor() {
    super('User was not found');
    this.errorCode = 'USER_001';
  }
}
