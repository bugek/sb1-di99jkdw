import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { LoggerService } from './logger.service';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('DatabaseService');
  }

  onApplicationBootstrap() {
    this.handleDatabaseEvents();
    this.checkConnection();
  }

  private handleDatabaseEvents() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully');
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });

    this.connection.on('error', (error) => {
      this.logger.error('❌ MongoDB connection error:', error.message);
    });
  }

  private checkConnection() {
    try {
      if (this.connection.readyState === 1) {
        this.logger.log('✅ MongoDB connected successfully');
      } else {
        this.logger.warn(`⚠️ MongoDB connection state: ${this.getReadyStateText(this.connection.readyState)}`);
      }
    } catch (error) {
      this.logger.error('❌ Failed to check MongoDB connection:', error.message);
    }
  }

  private getReadyStateText(state: number): string {
    switch (state) {
      case 0: return 'disconnected';
      case 1: return 'connected';
      case 2: return 'connecting';
      case 3: return 'disconnecting';
      default: return 'unknown';
    }
  }
}