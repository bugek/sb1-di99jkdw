import { Document } from 'mongoose';

export interface IReport extends Document {
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  metrics?: Record<string, number>;
  data?: any[];
  insights?: Record<string, any>;
  createdAt: Date;
  updatedAt?: Date;
}