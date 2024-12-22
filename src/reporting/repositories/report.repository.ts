import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schemas/report.schema';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(Report.name) private readonly model: Model<ReportDocument>,
  ) {}

  async create(dto: CreateReportDto): Promise<ReportDocument> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async findAll(): Promise<ReportDocument[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<ReportDocument | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateReportDto): Promise<ReportDocument | null> {
    return this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ReportDocument | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<ReportDocument[]> {
    return this.model
      .find({
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      })
      .exec();
  }

  async findByType(type: string): Promise<ReportDocument[]> {
    return this.model
      .find({ type })
      .exec();
  }
}