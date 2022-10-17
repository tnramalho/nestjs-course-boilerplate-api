import { HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { Matches, MinLength } from 'class-validator';

export function IsStrongPassword(): PropertyDecorator {
  return function (target, propertyKey: string | symbol) {
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'password is too weak, ' +
        'it must contain at least one number, one capital letter and one lowercase letter.',
    })(target, propertyKey);
    MinLength(8)(target, propertyKey as string);
  };
}

export function IsUUIDParam(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseUUIDPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => {
        return {
          statusCode: 400,
          message: 'This is not a valid id',
        };
      },
    })
  );
}
