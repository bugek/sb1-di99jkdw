import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterialsController } from './raw-materials.controller';
import { RawMaterialsService } from './services/raw-materials.service';
import { RawMaterialRepository } from './repositories/raw-material.repository';
import { RawMaterialValidator } from './validators/raw-material.validator';
import { RawMaterialAiService } from './services/raw-material-ai.service';
import { RawMaterial, RawMaterialSchema } from './schemas/raw-material.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawMaterial.name, schema: RawMaterialSchema },
    ]),
  ],
  controllers: [RawMaterialsController],
  providers: [
    RawMaterialsService,
    RawMaterialRepository,
    RawMaterialValidator,
    RawMaterialAiService,
  ],
  exports: [RawMaterialsService],
})
export class RawMaterialsModule {}