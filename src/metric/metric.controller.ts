import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  MetricType,
  MetricUnit,
  MetricUnitDistance,
  MetricUnitTemperature,
} from 'src/constants';
import { ConvertToCelsius, ConvertToCentimeter } from 'src/util';
import { CreateMetricDto } from './dto/create-metric.dto';
import { FilterMetricDto } from './dto/filter-metric.dto';
import { MetricService } from './metric.service';

@Controller('metric')
@ApiTags('Metric')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    const { value, unit, type } = createMetricDto;
    if (
      !value ||
      !(<any>Object).values(MetricUnit).includes(unit) ||
      !(<any>Object).values(MetricType).includes(type)
    ) {
      throw new BadRequestException('Wrong value, type or unit');
    }

    if (
      type === MetricType.DISTANCE &&
      (<any>Object).values(MetricUnitDistance).includes(unit) &&
      value >= 0
    ) {
      createMetricDto.mValue = ConvertToCentimeter(value, unit);
    } else if (
      type === MetricType.TEMPERATURE &&
      (<any>Object).values(MetricUnitTemperature).includes(unit)
    ) {
      createMetricDto.mValue = ConvertToCelsius(value, unit);
    } else {
      throw new BadRequestException(
        `${unit} is of ${type} is not valid with ${value}`,
      );
    }

    createMetricDto.date = new Date();
    return this.metricService.create(createMetricDto);
  }

  @Get()
  findAll(@Query() filterMetricDto: FilterMetricDto) {
    return this.metricService.findAll();
  }

  @Get('chart')
  findChart() {
    return this.metricService.findAll();
  }
}
