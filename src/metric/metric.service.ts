import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initialOptions } from 'src/util';
import { CreateMetricDto } from './dto/create-metric.dto';
import { FilterMetricDto } from './dto/filter-metric.dto';
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

  async findAll(filterMetricDto: FilterMetricDto) {
    const options = initialOptions(filterMetricDto);
    const { limit, skip, page, search } = options;

    const [data, total] = await Promise.all([
      this.metricModel.find(search).skip(skip).limit(limit).exec(),
      this.metricModel.countDocuments(search).exec(),
    ]);

    return {
      data,
      pagination: {
        total,
        limit,
        page,
      },
    };
  }
}
