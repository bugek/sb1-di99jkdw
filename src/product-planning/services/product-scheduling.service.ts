import { Injectable } from '@nestjs/common';
import { Product } from '../schemas/product.schema';
import { DateService } from '@shared/services/date.service';
import { ScheduleResponse, Milestone } from '../interfaces/schedule.interface';
import { throwIfNotFound } from '@shared/utils/error.utils';

@Injectable()
export class ProductSchedulingService {
  constructor(private readonly dateService: DateService) {}

  async createProductionSchedule(product: Product): Promise<ScheduleResponse> {
    throwIfNotFound(product, 'Product', product._id?.toString() || 'unknown');
    
    const startDate = this.dateService.getCurrentDate();
    const endDate = product.deadline;

    return {
      productId: product._id.toString(),
      schedule: {
        startDate,
        endDate,
        milestones: this.generateMilestones(product, startDate, endDate),
      },
    };
  }

  private generateMilestones(
    product: Product,
    startDate: Date,
    endDate: Date,
  ): Milestone[] {
    const duration = this.dateService.calculateLeadTime(startDate, endDate);
    const milestones: Milestone[] = [];

    if (!product.processes || product.processes.length === 0) {
      return milestones;
    }

    product.processes.forEach((process, index) => {
      if (!process || !process._id) {
        return;
      }

      const processStartDate = this.dateService.addDays(
        startDate,
        Math.floor((duration / product.processes.length) * index),
      );

      const processEndDate = this.dateService.addDays(
        startDate,
        Math.floor((duration / product.processes.length) * (index + 1)),
      );

      milestones.push({
        processId: process._id.toString(),
        plannedStartDate: processStartDate,
        plannedEndDate: processEndDate,
      });
    });

    return milestones;
  }
}