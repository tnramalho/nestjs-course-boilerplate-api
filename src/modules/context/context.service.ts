import { Injectable } from '@nestjs/common';
import { LoggerConfigInterface } from '../logger/interfaces';

@Injectable()
export class ContextService {
  defaultContext(): Promise<LoggerConfigInterface> {
    return new Promise<LoggerConfigInterface>(resolve => {
      setTimeout(() => {
        resolve({
          context: 'Default Context',
        } as LoggerConfigInterface);
      }, 500);
    });
  }
}
