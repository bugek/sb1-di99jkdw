import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProcessStatusType } from '../constants/process.constants';

@Schema()
export class Process extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [String], required: true })
  requiredResources: string[];

  @Prop({ type: [String] })
  dependencies: string[];

  @Prop({
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  })
  status: ProcessStatusType;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  startDate: Date;

  @Prop()
  completionDate: Date;
}

export const ProcessSchema = SchemaFactory.createForClass(Process);