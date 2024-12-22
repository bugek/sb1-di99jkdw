import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawMaterial } from '../schemas/raw-material.schema';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';

@Injectable()
export class RawMaterialRepository {
  constructor(
    @InjectModel(RawMaterial.name) private readonly model: Model<RawMaterial>,
  ) {}

  async create(dto: CreateRawMaterialDto): Promise<RawMaterial> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async findAll(): Promise<RawMaterial[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<RawMaterial | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateRawMaterialDto): Promise<RawMaterial | null> {
    return this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<RawMaterial | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async isStockSufficient(material: RawMaterial): Promise<boolean> {
    return material.quantity > (material.minimumStock || 0);
  }
}