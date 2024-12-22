import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';
import { ReportAiService } from './services/report-ai.service';
import { ReportValidationService } from './services/report-validation.service';
import { ReportRepository } from './repositories/report.repository';
import { Report, ReportSchema } from './schemas/report.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
    ]),
    SharedModule,
  ],
  controllers: [ReportingController],
  providers: [
    ReportingService,
    ReportAiService,
    ReportValidationService,
    ReportRepository,
  ],
  exports: [ReportingService],
})
export class ReportingModule {}