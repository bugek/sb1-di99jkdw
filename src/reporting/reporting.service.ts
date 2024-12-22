import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportAiService } from './services/report-ai.service';
import { throwIfNotFound, throwIfInvalid } from '@shared/utils/error.utils';

@Injectable()
export class ReportingService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    private reportAiService: ReportAiService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<ReportDocument> {
    const createdReport = new this.reportModel(createReportDto);
    const report = await createdReport.save();
    return throwIfNotFound(report, 'Report', 'new');
  }

  async findAll(): Promise<ReportDocument[]> {
    const reports = await this.reportModel.find().exec();
    return reports || [];
  }

  async findOne(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id).exec();
    return throwIfNotFound(report, 'Report', id);
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<ReportDocument> {
    const report = await this.reportModel
      .findByIdAndUpdate(id, updateReportDto, { new: true })
      .exec();
    return throwIfNotFound(report, 'Report', id);
  }

  async remove(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findByIdAndDelete(id).exec();
    return throwIfNotFound(report, 'Report', id);
  }

  async analyzePerformance(id: string): Promise<any> {
    const report = await this.findOne(id);
    return this.reportAiService.analyzePerformance(report);
  }

  async predictMetrics(): Promise<any> {
    const historicalReports = await this.findAll();
    throwIfInvalid(
      historicalReports.length > 0,
      'No historical reports available for prediction'
    );
    return this.reportAiService.predictMetrics(historicalReports);
  }

  async generateProductionReport(startDate: Date, endDate: Date): Promise<ReportDocument> {
    throwIfInvalid(
      startDate < endDate,
      'Start date must be before end date'
    );
    
    const reportData = {
      name: 'Production Report',
      type: 'production',
      startDate,
      endDate,
      metrics: {
        totalProduction: 0,
        efficiency: 0,
        qualityScore: 0,
      },
      data: [],
      insights: {},
    };

    return this.create(reportData);
  }

  async generateCostReport(startDate: Date, endDate: Date): Promise<ReportDocument> {
    throwIfInvalid(
      startDate < endDate,
      'Start date must be before end date'
    );
    
    const reportData = {
      name: 'Cost Analysis Report',
      type: 'cost',
      startDate,
      endDate,
      metrics: {
        totalCost: 0,
        averageCost: 0,
        costVariance: 0,
      },
      data: [],
      insights: {},
    };

    return this.create(reportData);
  }
}