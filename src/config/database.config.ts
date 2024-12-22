import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}

export default registerAs('database', (): DatabaseConfig => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/production-planning',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}));