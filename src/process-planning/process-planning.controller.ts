import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProcessPlanningService } from './process-planning.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './schemas/process.schema';

@ApiTags('process-planning')
@Controller('process-planning')
export class ProcessPlanningController {
  constructor(private readonly processPlanningService: ProcessPlanningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new process' })
  create(@Body() createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processPlanningService.create(createProcessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all processes' })
  findAll(): Promise<Process[]> {
    return this.processPlanningService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a process by id' })
  findOne(@Param('id') id: string): Promise<Process> {
    return this.processPlanningService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a process' })
  update(
    @Param('id') id: string,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<Process> {
    return this.processPlanningService.update(id, updateProcessDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a process' })
  remove(@Param('id') id: string): Promise<Process> {
    return this.processPlanningService.remove(id);
  }

  @Get('ai/optimize-schedule')
  @ApiOperation({ summary: 'Optimize process schedule using AI/ML' })
  optimizeSchedule() {
    return this.processPlanningService.optimizeSchedule();
  }

  @Get(':id/ai/detect-anomalies')
  @ApiOperation({ summary: 'Detect anomalies in process using AI/ML' })
  detectAnomalies(@Param('id') id: string) {
    return this.processPlanningService.detectAnomalies(id);
  }
}