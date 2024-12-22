import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RawMaterial extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;

  @Prop()
  supplier: string;

  @Prop()
  leadTime: number;

  @Prop()
  minimumStock: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial);