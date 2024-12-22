import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.model
      .find()
      .populate('requiredMaterials')
      .populate('processes')
      .exec();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.model
      .findById(id)
      .populate('requiredMaterials')
      .populate('processes')
      .exec();
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument | null> {
    const updatedProduct = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('requiredMaterials')
      .populate('processes')
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async delete(id: string): Promise<ProductDocument | null> {
    const deletedProduct = await this.model.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return deletedProduct;
  }

  async findByMaterialId(materialId: string): Promise<ProductDocument[]> {
    return this.model
      .find({ requiredMaterials: materialId })
      .populate('requiredMaterials')
      .populate('processes')
      .exec();
  }

  async findByProcessId(processId: string): Promise<ProductDocument[]> {
    return this.model
      .find({ processes: processId })
      .populate('requiredMaterials')
      .populate('processes')
      .exec();
  }
}