import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  environment: string;
}

export default registerAs('app', (): AppConfig => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  environment: process.env.NODE_ENV || 'development',
}));