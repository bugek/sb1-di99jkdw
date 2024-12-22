import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Process } from '../schemas/process.schema';
import { CreateProcessDto } from '../dto/create-process.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';

@Injectable()
export class ProcessRepository {
  constructor(
    @InjectModel(Process.name) private readonly model: Model<Process>,
  ) {}

  async create(dto: CreateProcessDto): Promise<Process> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async findAll(): Promise<Process[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<Process | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateProcessDto): Promise<Process | null> {
    return this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Process | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}