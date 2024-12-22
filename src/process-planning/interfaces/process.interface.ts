import { BaseEntity } from '@shared/interfaces/base-entity.interface';

export interface IProcess extends BaseEntity {
  name: string;
  duration: number;
  requiredResources: string[];
  dependencies?: string[];
  status: 'pending' | 'in-progress' | 'completed';
  startDate?: Date;
  completionDate?: Date;
}