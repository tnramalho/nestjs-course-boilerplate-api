import { ClassConstructor, plainToInstance } from 'class-transformer';
import { UserInterface } from '../../core/user/domain/interfaces';
import { UserDto } from '../controller/user/dto/user.dto';

export class UserPresenter {
  static toJson(plain: UserInterface) {
    return plainToInstance(UserDto, plain);
  }
  static toArrayJson(plain: UserInterface[]) {
    return plainToInstance(UserDto, plain);
  }
  static toXml<T, V>(typeDto: ClassConstructor<T>, plain: V) {
    // Convert to XML
    return plainToInstance<T, V>(typeDto, plain);
  }
}
