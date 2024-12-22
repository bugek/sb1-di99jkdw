import { Module, Global } from '@nestjs/common';
import { DateService } from './services/date.service';
import { ValidationService } from './services/validation.service';
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Global()
@Module({
  providers: [
    DateService,
    ValidationService,
    DatabaseService,
    LoggerService
  ],
  exports: [
    DateService,
    ValidationService,
    DatabaseService,
    LoggerService
  ],
})
export class SharedModule {}