import { Injectable } from '@nestjs/common';
import { Process } from '../schemas/process.schema';
import { CreateProcessDto } from '../dto/create-process.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';
import { ProcessRepository } from '../repositories/process.repository';
import { ProcessValidator } from '../validators/process.validator';
import { ProcessAiService } from './process-ai.service';
import { ProcessSchedulingService } from './process-scheduling.service';
import { ProcessMonitoringService } from './process-monitoring.service';
import { throwIfNotFound, throwIfInvalid } from '@shared/utils/error.utils';

@Injectable()
export class ProcessPlanningService {
  constructor(
    private readonly repository: ProcessRepository,
    private readonly validator: ProcessValidator,
    private readonly aiService: ProcessAiService,
    private readonly schedulingService: ProcessSchedulingService,
    private readonly monitoringService: ProcessMonitoringService,
  ) {}

  async create(dto: CreateProcessDto): Promise<Process> {
    this.validator.validateCreate(dto);
    const process = await this.repository.create(dto);
    return throwIfNotFound(process, 'Process', 'new');
  }

  async findAll(): Promise<Process[]> {
    const processes = await this.repository.findAll();
    return processes || [];
  }

  async findOne(id: string): Promise<Process> {
    const process = await this.repository.findById(id);
    return throwIfNotFound(process, 'Process', id);
  }

  async update(id: string, dto: UpdateProcessDto): Promise<Process> {
    this.validator.validateUpdate(dto);
    const process = await this.repository.update(id, dto);
    return throwIfNotFound(process, 'Process', id);
  }

  async remove(id: string): Promise<Process> {
    const process = await this.repository.delete(id);
    return throwIfNotFound(process, 'Process', id);
  }

  async getProcessSchedule(id: string): Promise<any> {
    const process = await this.findOne(id);
    return this.schedulingService.calculateProcessSchedule(process);
  }

  async getProcessMetrics(id: string): Promise<any> {
    const process = await this.findOne(id);
    return this.monitoringService.getProcessMetrics(process);
  }

  async optimizeSchedule(): Promise<any> {
    const processes = await this.findAll();
    throwIfInvalid(processes.length > 0, 'No processes available for optimization');
    return this.aiService.optimizeSchedule(processes);
  }

  async detectAnomalies(id: string): Promise<any> {
    const process = await this.findOne(id);
    return this.aiService.detectAnomalies(process);
  }
}