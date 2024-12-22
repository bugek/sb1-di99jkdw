import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawMaterial } from './schemas/raw-material.schema';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { throwIfNotFound } from '@shared/utils/error.utils';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectModel(RawMaterial.name) private rawMaterialModel: Model<RawMaterial>,
  ) {}

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    const createdMaterial = new this.rawMaterialModel(createRawMaterialDto);
    return createdMaterial.save();
  }

  async findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialModel.find().exec();
  }

  async findOne(id: string): Promise<RawMaterial> {
    const material = await this.rawMaterialModel.findById(id).exec();
    return throwIfNotFound(material, 'Raw Material', id);
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const updatedMaterial = await this.rawMaterialModel
      .findByIdAndUpdate(id, updateRawMaterialDto, { new: true })
      .exec();
    return throwIfNotFound(updatedMaterial, 'Raw Material', id);
  }

  async remove(id: string): Promise<RawMaterial> {
    const deletedMaterial = await this.rawMaterialModel.findByIdAndDelete(id).exec();
    return throwIfNotFound(deletedMaterial, 'Raw Material', id);
  }

  // AI/ML Placeholder: Material shortage prediction
  async predictMaterialShortages(): Promise<any> {
    // Implementation for ML-based material shortage prediction
    return { message: 'Material shortage prediction not implemented yet' };
  }
}