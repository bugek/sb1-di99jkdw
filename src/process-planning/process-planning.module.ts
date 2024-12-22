import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessPlanningController } from './process-planning.controller';
import { ProcessPlanningService } from './services/process-planning.service';
import { ProcessRepository } from './repositories/process.repository';
import { ProcessValidator } from './validators/process.validator';
import { ProcessAiService } from './services/process-ai.service';
import { ProcessSchedulingService } from './services/process-scheduling.service';
import { ProcessMonitoringService } from './services/process-monitoring.service';
import { Process, ProcessSchema } from './schemas/process.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Process.name, schema: ProcessSchema },
    ]),
    SharedModule,
  ],
  controllers: [ProcessPlanningController],
  providers: [
    ProcessPlanningService,
    ProcessRepository,
    ProcessValidator,
    ProcessAiService,
    ProcessSchedulingService,
    ProcessMonitoringService,
  ],
  exports: [ProcessPlanningService],
})
export class ProcessPlanningModule {}