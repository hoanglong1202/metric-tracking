import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMetricDto } from './dto/create-metric.dto';
import { Metric, MetricDocument } from './entities/metric.entity';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  create(createMetricDto: CreateMetricDto) {
    const createdCat = new this.metricModel(createMetricDto);
    return createdCat.save();
  }

  findAll() {
    return this.metricModel.find().exec();
  }
}
