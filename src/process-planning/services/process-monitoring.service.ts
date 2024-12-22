import { Injectable } from '@nestjs/common';
import { Process } from '../schemas/process.schema';
import { PROCESS_CONSTANTS } from '../constants/process.constants';

@Injectable()
export class ProcessMonitoringService {
  calculateProgress(process: Process): number {
    if (process.status === PROCESS_CONSTANTS.STATUS.COMPLETED) {
      return 100;
    }
    if (process.status === PROCESS_CONSTANTS.STATUS.PENDING) {
      return 0;
    }

    const startDate = process.startDate || new Date();
    const currentDate = new Date();
    const elapsedDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(Math.floor((elapsedDays / process.duration) * 100), 100);
  }

  checkResourceAvailability(process: Process): boolean {
    // Placeholder for resource availability check
    return true;
  }

  getProcessMetrics(process: Process): any {
    return {
      progress: this.calculateProgress(process),
      resourcesAvailable: this.checkResourceAvailability(process),
      status: process.status,
      duration: process.duration,
    };
  }
}