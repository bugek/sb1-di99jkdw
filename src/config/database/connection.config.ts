import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { LoggerService } from '../../shared/services/logger.service';
import { MongooseConnectionError } from '../../shared/types/mongoose.types';

export const createMongooseOptions = (
  configService: ConfigService,
  logger: LoggerService,
): MongooseModuleOptions => ({
  uri: configService.get<string>('database.uri'),
  connectionFactory: (connection) => {
    connection.on('connected', () => {
      logger.log('✅ MongoDB connected successfully', 'DatabaseConnection');
    });

    connection.on('error', (error: MongooseConnectionError) => {
      logger.error('❌ MongoDB connection error:', error.message, 'DatabaseConnection');
    });

    return connection;
  },
  connectTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  retryReads: true,
});