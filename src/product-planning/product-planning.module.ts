import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductPlanningController } from './product-planning.controller';
import { ProductPlanningService } from './services/product-planning.service';
import { ProductAiService } from './services/product-ai.service';
import { ProductValidationService } from './services/product-validation.service';
import { ProductDemandService } from './services/product-demand.service';
import { ProductOptimizationService } from './services/product-optimization.service';
import { ProductSchedulingService } from './services/product-scheduling.service';
import { ProductRepository } from './repositories/product.repository';
import { Product, ProductSchema } from './schemas/product.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
    SharedModule,
  ],
  controllers: [ProductPlanningController],
  providers: [
    ProductPlanningService,
    ProductAiService,
    ProductValidationService,
    ProductDemandService,
    ProductOptimizationService,
    ProductSchedulingService,
    ProductRepository,
  ],
  exports: [ProductPlanningService],
})
export class ProductPlanningModule {}