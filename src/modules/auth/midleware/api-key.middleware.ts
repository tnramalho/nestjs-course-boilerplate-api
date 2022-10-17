import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { API_KEY_HEADER } from '../../../common/constants';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers[API_KEY_HEADER] !== 'API_KEY')
      throw new UnauthorizedException('API KEY is missing');
    next();
  }
}
