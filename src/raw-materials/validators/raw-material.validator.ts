import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';
import { RAW_MATERIAL_CONSTANTS } from '../constants/raw-material.constants';

@Injectable()
export class RawMaterialValidator {
  async validateCreate(dto: CreateRawMaterialDto): Promise<void> {
    if (dto.quantity < RAW_MATERIAL_CONSTANTS.MIN_QUANTITY) {
      throw new BadRequestException('Quantity must be greater than or equal to minimum quantity');
    }

    if (dto.leadTime && dto.leadTime > RAW_MATERIAL_CONSTANTS.MAX_LEAD_TIME) {
      throw new BadRequestException('Lead time exceeds maximum allowed value');
    }

    if (!RAW_MATERIAL_CONSTANTS.VALID_UNITS.includes(dto.unit as any)) {
      throw new BadRequestException('Invalid unit specified');
    }
  }

  async validateUpdate(dto: UpdateRawMaterialDto): Promise<void> {
    if (dto.quantity !== undefined && dto.quantity < RAW_MATERIAL_CONSTANTS.MIN_QUANTITY) {
      throw new BadRequestException('Quantity must be greater than or equal to minimum quantity');
    }

    if (dto.leadTime && dto.leadTime > RAW_MATERIAL_CONSTANTS.MAX_LEAD_TIME) {
      throw new BadRequestException('Lead time exceeds maximum allowed value');
    }

    if (dto.unit && !RAW_MATERIAL_CONSTANTS.VALID_UNITS.includes(dto.unit as any)) {
      throw new BadRequestException('Invalid unit specified');
    }
  }
}