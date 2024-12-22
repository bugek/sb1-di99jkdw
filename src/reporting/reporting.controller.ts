import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportingService } from './reporting.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './schemas/report.schema';

@ApiTags('reporting')
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return this.reportingService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  findAll(): Promise<Report[]> {
    return this.reportingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a report by id' })
  findOne(@Param('id') id: string): Promise<Report> {
    return this.reportingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a report' })
  update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<Report> {
    return this.reportingService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report' })
  remove(@Param('id') id: string): Promise<Report> {
    return this.reportingService.remove(id);
  }

  @Get('ai/analyze-performance/:id')
  @ApiOperation({ summary: 'Analyze report performance using AI/ML' })
  analyzePerformance(@Param('id') id: string) {
    return this.reportingService.analyzePerformance(id);
  }

  @Get('ai/predict-metrics')
  @ApiOperation({ summary: 'Predict future metrics using AI/ML' })
  predictMetrics() {
    return this.reportingService.predictMetrics();
  }

  @Post('generate/production')
  @ApiOperation({ summary: 'Generate a production report' })
  generateProductionReport(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<Report> {
    return this.reportingService.generateProductionReport(startDate, endDate);
  }

  @Post('generate/cost')
  @ApiOperation({ summary: 'Generate a cost analysis report' })
  generateCostReport(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<Report> {
    return this.reportingService.generateCostReport(startDate, endDate);
  }
}