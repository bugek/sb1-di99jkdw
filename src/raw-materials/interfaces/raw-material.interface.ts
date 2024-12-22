import { BaseEntity } from '@shared/interfaces/base-entity.interface';

export interface IRawMaterial extends BaseEntity {
  name: string;
  quantity: number;
  unit: string;
  supplier?: string;
  leadTime?: number;
  minimumStock?: number;
}