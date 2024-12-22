import { Injectable, Logger, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger implements NestLoggerService {
  constructor() {
    super();
  }

  setContext(context: string) {
    this.context = context;
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context || this.context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context || this.context);
  }

  log(message: any, context?: string) {
    super.log(message, context || this.context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context || this.context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context || this.context);
  }
}