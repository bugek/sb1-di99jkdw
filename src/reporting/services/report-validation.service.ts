import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { REPORT_CONSTANTS } from '../constants/report.constants';
import { ValidationService } from '@shared/services/validation.service';

@Injectable()
export class ReportValidationService {
  constructor(private readonly validationService: ValidationService) {}

  validateCreate(dto: CreateReportDto): void {
    this.validateDates(dto.startDate, dto.endDate);
    this.validateType(dto.type);
    this.validateName(dto.name);
  }

  validateUpdate(dto: UpdateReportDto): void {
    if (dto.startDate && dto.endDate) {
      this.validateDates(dto.startDate, dto.endDate);
    }
    if (dto.type) {
      this.validateType(dto.type);
    }
    if (dto.name) {
      this.validateName(dto.name);
    }
  }

  private validateDates(startDate: Date, endDate: Date): void {
    if (!this.validationService.isValidDate(startDate) || 
        !this.validationService.isValidDate(endDate)) {
      throw new BadRequestException('Invalid date format');
    }

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }
  }

  private validateType(type: string): void {
    const validTypes = Object.values(REPORT_CONSTANTS.TYPES);
    if (!validTypes.includes(type as any)) {
      throw new BadRequestException(
        `Invalid report type. Must be one of: ${validTypes.join(', ')}`
      );
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Report name cannot be empty');
    }
  }
}