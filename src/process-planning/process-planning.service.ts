import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Process } from './schemas/process.schema';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessAiService } from './services/process-ai.service';
import { throwIfNotFound } from '@shared/utils/error.utils';

@Injectable()
export class ProcessPlanningService {
  constructor(
    @InjectModel(Process.name) private processModel: Model<Process>,
    private processAiService: ProcessAiService,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<Process> {
    const createdProcess = new this.processModel(createProcessDto);
    return createdProcess.save();
  }

  async findAll(): Promise<Process[]> {
    return this.processModel.find().exec();
  }

  async findOne(id: string): Promise<Process> {
    const process = await this.processModel.findById(id).exec();
    return throwIfNotFound(process, 'Process', id);
  }

  async update(id: string, updateProcessDto: UpdateProcessDto): Promise<Process> {
    const updatedProcess = await this.processModel
      .findByIdAndUpdate(id, updateProcessDto, { new: true })
      .exec();
    return throwIfNotFound(updatedProcess, 'Process', id);
  }

  async remove(id: string): Promise<Process> {
    const deletedProcess = await this.processModel.findByIdAndDelete(id).exec();
    return throwIfNotFound(deletedProcess, 'Process', id);
  }

  async optimizeSchedule(): Promise<any> {
    const processes = await this.findAll();
    return this.processAiService.optimizeSchedule(processes);
  }

  async detectAnomalies(id: string): Promise<any> {
    const process = await this.findOne(id);
    return this.processAiService.detectAnomalies(process);
  }
}