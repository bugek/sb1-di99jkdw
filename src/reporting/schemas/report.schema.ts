import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: MongooseSchema.Types.Mixed })
  metrics: Record<string, number>;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  data: any[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  insights: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  _id: MongooseSchema.Types.ObjectId;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

// Add indexes and hooks
ReportSchema.index({ type: 1, startDate: 1, endDate: 1 });
ReportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});