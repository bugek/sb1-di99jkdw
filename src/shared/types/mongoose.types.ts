import { Connection } from 'mongoose';

export type MongooseConnectionError = Error & {
  name: string;
  message: string;
  stack?: string;
};

export type MongooseConnectionFactory = (connection: Connection) => Connection;