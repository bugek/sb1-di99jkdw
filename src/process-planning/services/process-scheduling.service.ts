import { Injectable } from '@nestjs/common';
import { Process } from '../schemas/process.schema';
import { DateService } from '@shared/services/date.service';

@Injectable()
export class ProcessSchedulingService {
  constructor(private readonly dateService: DateService) {}

  calculateProcessSchedule(process: Process): any {
    const startDate = process.startDate || this.dateService.getCurrentDate();
    const endDate = this.dateService.addDays(startDate, process.duration);

    return {
      processId: process.id,
      startDate,
      endDate,
      duration: process.duration,
      status: process.status,
    };
  }

  generateTimeline(processes: Process[]): any[] {
    return processes.map(process => ({
      ...this.calculateProcessSchedule(process),
      dependencies: process.dependencies,
      requiredResources: process.requiredResources,
    }));
  }
}