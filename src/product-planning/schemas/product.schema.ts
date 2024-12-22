import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RawMaterial } from '../../raw-materials/schemas/raw-material.schema';
import { Process } from '../../process-planning/schemas/process.schema';
import { PRODUCT_CONSTANTS, ProductStatus } from '../constants/product.constants';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'RawMaterial' }] })
  requiredMaterials: RawMaterial[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Process' }] })
  processes: Process[];

  @Prop({
    type: String,
    enum: Object.values(PRODUCT_CONSTANTS.STATUS),
    default: PRODUCT_CONSTANTS.STATUS.PLANNED,
  })
  status: ProductStatus;

  @Prop({ min: PRODUCT_CONSTANTS.MIN_PRIORITY, max: PRODUCT_CONSTANTS.MAX_PRIORITY })
  priority: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);