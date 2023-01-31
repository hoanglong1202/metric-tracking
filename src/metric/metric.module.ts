import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { Metric, MetricSchema } from './entities/metric.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
  ],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
