import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductPlanningService } from './services/product-planning.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@ApiTags('product-planning')
@Controller('product-planning')
export class ProductPlanningController {
  constructor(private readonly productPlanningService: ProductPlanningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productPlanningService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
  findAll(): Promise<ProductDocument[]> {
    return this.productPlanningService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<ProductDocument> {
    try {
      return await this.productPlanningService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return this.productPlanningService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string): Promise<ProductDocument> {
    return this.productPlanningService.remove(id);
  }

  @Get('ai/predict-demand')
  @ApiOperation({ summary: 'Predict product demand using AI/ML' })
  @ApiResponse({ status: 200, description: 'Demand prediction generated successfully' })
  predictDemand() {
    return this.productPlanningService.predictDemand();
  }

  @Get(':id/ai/optimize-production')
  @ApiOperation({ summary: 'Optimize production using AI/ML' })
  @ApiResponse({ status: 200, description: 'Production optimization generated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  optimizeProduction(@Param('id') id: string) {
    return this.productPlanningService.optimizeProduction(id);
  }
}