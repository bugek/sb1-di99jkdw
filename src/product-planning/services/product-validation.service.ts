import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PRODUCT_CONSTANTS, ProductStatus } from '../constants/product.constants';
import { ValidationService } from '@shared/services/validation.service';

@Injectable()
export class ProductValidationService {
  constructor(private readonly validationService: ValidationService) {}

  async validateCreateDto(dto: CreateProductDto): Promise<void> {
    this.validateQuantity(dto.quantity);
    this.validatePriority(dto.priority);
    this.validateDeadline(dto.deadline);
    this.validateRequiredMaterials(dto.requiredMaterials);
    this.validateProcesses(dto.processes);
    if (dto.status) {
      await this.validateStatus(dto.status);
    }
  }

  async validateUpdateDto(dto: UpdateProductDto): Promise<void> {
    if (dto.quantity !== undefined) {
      this.validateQuantity(dto.quantity);
    }
    if (dto.priority !== undefined) {
      this.validatePriority(dto.priority);
    }
    if (dto.deadline) {
      this.validateDeadline(dto.deadline);
    }
    if (dto.status) {
      await this.validateStatus(dto.status);
    }
  }

  async validateStatus(status: ProductStatus): Promise<void> {
    const validStatuses = Object.values(PRODUCT_CONSTANTS.STATUS);
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid product status. Must be one of: ${validStatuses.join(', ')}`
      );
    }
  }

  private validateQuantity(quantity: number): void {
    if (quantity < PRODUCT_CONSTANTS.MIN_QUANTITY) {
      throw new BadRequestException(
        `Quantity must be greater than or equal to ${PRODUCT_CONSTANTS.MIN_QUANTITY}`
      );
    }
  }

  private validatePriority(priority?: number): void {
    if (priority !== undefined && !this.isValidPriority(priority)) {
      throw new BadRequestException(
        `Priority must be between ${PRODUCT_CONSTANTS.MIN_PRIORITY} and ${PRODUCT_CONSTANTS.MAX_PRIORITY}`
      );
    }
  }

  private validateDeadline(deadline: Date): void {
    if (!this.validationService.isValidDate(deadline)) {
      throw new BadRequestException('Invalid deadline date');
    }
    if (new Date(deadline) <= new Date()) {
      throw new BadRequestException('Deadline must be in the future');
    }
  }

  private validateRequiredMaterials(materials: string[]): void {
    if (!materials?.length) {
      throw new BadRequestException('At least one required material must be specified');
    }
  }

  private validateProcesses(processes: string[]): void {
    if (!processes?.length) {
      throw new BadRequestException('At least one process must be specified');
    }
  }

  private isValidPriority(priority: number): boolean {
    return (
      priority >= PRODUCT_CONSTANTS.MIN_PRIORITY &&
      priority <= PRODUCT_CONSTANTS.MAX_PRIORITY
    );
  }
}