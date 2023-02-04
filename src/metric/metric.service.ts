import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initialOptions } from 'src/util';
import { ChartMetricDto } from './dto/chart-metric.dto';
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

  async findChartData(chartMetricDto: ChartMetricDto) {
    const { time, type } = chartMetricDto;
    const current = new Date();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();
    const date = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);

    const query: any = { type };

    if (time === 'CURRENT_MONTH') {
      query.date = { $gte: date };
    }

    const data = await this.metricModel.find(query).sort({ date: -1 }).exec();

    return {
      data,
    };
  }
}
