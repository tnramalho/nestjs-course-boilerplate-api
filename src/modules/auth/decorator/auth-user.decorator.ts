import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that takes a property name as key, and returns the
 * associated value if it exists (or undefined if it doesn't exist,
 * or if the user object has not been created).
 *
 * ```ts
 * @Get()
 * async findOne(@User('firstName') firstName: string) {
 *   console.log(`Hello ${firstName}`);
 * }
 * ```
 */
export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
