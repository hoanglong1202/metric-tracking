import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MetricType, MetricUnit } from 'src/constants';

export type MetricDocument = HydratedDocument<Metric>;

@Schema()
export class Metric {
  @Prop({ type: String, enum: MetricUnit, default: MetricUnit.METER })
  unit: string;

  @Prop()
  value: number;

  @Prop({ type: String, enum: MetricType, default: MetricType.DISTANCE })
  type: string;

  @Prop()
  date: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
