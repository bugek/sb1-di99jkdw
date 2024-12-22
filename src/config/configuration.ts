import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  MONGODB_URI: z.string().optional(),
  JWT_SECRET: z.string().optional(),
});

export default () => {
  const env = envSchema.parse(process.env);
  
  return {
    port: env.PORT ? parseInt(env.PORT, 10) : 3000,
    database: {
      uri: env.MONGODB_URI || 'mongodb://localhost/production-planning',
    },
    jwt: {
      secret: env.JWT_SECRET || 'your-secret-key',
      expiresIn: '1d',
    },
  };
}