import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawMaterial } from '../schemas/raw-material.schema';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';
import { findOneOrThrow, updateOneOrThrow, deleteOneOrThrow } from '@shared/utils/mongoose.utils';
import { RawMaterialRepository } from '../repositories/raw-material.repository';
import { RawMaterialValidator } from '../validators/raw-material.validator';

@Injectable()
export class RawMaterialsService {
  constructor(
    private readonly repository: RawMaterialRepository,
    private readonly validator: RawMaterialValidator,
  ) {}

  async create(dto: CreateRawMaterialDto): Promise<RawMaterial> {
    await this.validator.validateCreate(dto);
    return this.repository.create(dto);
  }

  async findAll(): Promise<RawMaterial[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<RawMaterial> {
    return findOneOrThrow(
      this.repository.findById(id),
      id,
      'Raw Material'
    );
  }

  async update(id: string, dto: UpdateRawMaterialDto): Promise<RawMaterial> {
    await this.validator.validateUpdate(dto);
    return updateOneOrThrow(
      this.repository.update(id, dto),
      id,
      'Raw Material'
    );
  }

  async remove(id: string): Promise<RawMaterial> {
    return deleteOneOrThrow(
      this.repository.delete(id),
      id,
      'Raw Material'
    );
  }

  async checkStock(id: string): Promise<boolean> {
    const material = await this.findOne(id);
    return this.repository.isStockSufficient(material);
  }
}