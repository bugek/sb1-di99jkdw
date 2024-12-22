import { BaseEntity } from '@shared/interfaces/base-entity.interface';

export interface IProduct extends BaseEntity {
  name: string;
  quantity: number;
  deadline: Date;
  requiredMaterials: string[];
  processes: string[];
  status: 'planned' | 'in-progress' | 'completed';
  priority?: number;
}