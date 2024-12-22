import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { ProductValidationService } from './product-validation.service';
import { ProductDemandService } from './product-demand.service';
import { ProductOptimizationService } from './product-optimization.service';
import { ProductSchedulingService } from './product-scheduling.service';
import { throwIfNotFound } from '@shared/utils/error.utils';
import { PRODUCT_CONSTANTS, ProductStatus } from '../constants/product.constants';

@Injectable()
export class ProductPlanningService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly validationService: ProductValidationService,
    private readonly demandService: ProductDemandService,
    private readonly optimizationService: ProductOptimizationService,
    private readonly schedulingService: ProductSchedulingService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    await this.validationService.validateCreateDto(createProductDto);
    const product = await this.repository.create(createProductDto);
    return throwIfNotFound(product, 'Product', 'new');
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.repository.findById(id);
    return throwIfNotFound(product, 'Product', id);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    await this.validationService.validateUpdateDto(updateProductDto);
    const updatedProduct = await this.repository.update(id, updateProductDto);
    return throwIfNotFound(updatedProduct, 'Product', id);
  }

  async remove(id: string): Promise<ProductDocument> {
    const deletedProduct = await this.repository.delete(id);
    return throwIfNotFound(deletedProduct, 'Product', id);
  }

  async predictDemand(): Promise<any> {
    const products = await this.findAll();
    if (!products.length) {
      throw new NotFoundException('No products available for demand prediction');
    }
    return this.demandService.predictDemand(products);
  }

  async optimizeProduction(id: string): Promise<any> {
    const product = await this.findOne(id);
    return this.optimizationService.optimizeProduction(product);
  }

  async getProductSchedule(id: string): Promise<any> {
    const product = await this.findOne(id);
    return this.schedulingService.createProductionSchedule(product);
  }

  async findByMaterial(materialId: string): Promise<ProductDocument[]> {
    const products = await this.repository.findByMaterialId(materialId);
    return products || [];
  }

  async findByProcess(processId: string): Promise<ProductDocument[]> {
    const products = await this.repository.findByProcessId(processId);
    return products || [];
  }

  async updateProductStatus(id: string, status: ProductStatus): Promise<ProductDocument> {
    const product = await this.findOne(id);
    await this.validationService.validateStatus(status);
    const productData = product.toObject();
    return this.update(id, { ...productData, status });
  }
}