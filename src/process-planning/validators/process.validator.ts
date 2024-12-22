import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProcessDto } from '../dto/create-process.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';
import { PROCESS_CONSTANTS, ProcessStatusType } from '../constants/process.constants';

@Injectable()
export class ProcessValidator {
  validateCreate(dto: CreateProcessDto): void {
    this.validateDuration(dto.duration);
    this.validateResources(dto.requiredResources);
    if (dto.status) {
      this.validateStatus(dto.status);
    }
  }

  validateUpdate(dto: UpdateProcessDto): void {
    if (dto.duration !== undefined) {
      this.validateDuration(dto.duration);
    }
    if (dto.requiredResources) {
      this.validateResources(dto.requiredResources);
    }
    if (dto.status) {
      this.validateStatus(dto.status);
    }
  }

  private validateDuration(duration: number): void {
    if (
      duration < PROCESS_CONSTANTS.MIN_DURATION || 
      duration > PROCESS_CONSTANTS.MAX_DURATION
    ) {
      throw new BadRequestException(
        `Duration must be between ${PROCESS_CONSTANTS.MIN_DURATION} and ${PROCESS_CONSTANTS.MAX_DURATION} days`
      );
    }
  }

  private validateResources(resources: string[]): void {
    if (!resources?.length) {
      throw new BadRequestException('At least one required resource must be specified');
    }
  }

  private validateStatus(status: string): void {
    const validStatuses = Object.values(PROCESS_CONSTANTS.STATUS) as string[];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid process status. Must be one of: ${validStatuses.join(', ')}`
      );
    }
  }
}