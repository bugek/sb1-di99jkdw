export type ProcessStatus = 'pending' | 'in-progress' | 'completed';

export interface ProcessMetrics {
  progress: number;
  resourcesAvailable: boolean;
  status: ProcessStatus;
  duration: number;
}

export interface ProcessSchedule {
  processId: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  status: ProcessStatus;
}