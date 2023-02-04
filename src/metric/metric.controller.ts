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
  ConvertValueToUnit,
  FormatMetricArr,
  MetricMinValueConverter,
  MetricTracking,
} from 'src/util';
import { ChartMetricDto } from './dto/chart-metric.dto';
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
    const isValidUnit = MetricTracking(type, unit);
    const valueConverter = MetricMinValueConverter(value, unit, type);

    if (!isValidUnit.isValid || !valueConverter.isValid) {
      throw new BadRequestException(
        `${unit} is of ${type} is not valid with ${value}`,
      );
    }

    if (value >= 1_000_000) {
      throw new BadRequestException(`${value} is out of range`);
    }

    createMetricDto.mValue = valueConverter.mValue;

    createMetricDto.date = new Date();
    return this.metricService.create(createMetricDto);
  }

  @Get()
  async findAll(@Query() filterMetricDto: FilterMetricDto) {
    const { type, unit } = filterMetricDto;
    const result = await this.metricService.findAll(filterMetricDto);

    if (unit) {
      const temp = result.data;
      const isValidUnit = MetricTracking(type, unit);

      if (!isValidUnit.isValid) {
        result.data = [];
        result.pagination.total = 0;
        return {
          message: `${unit} is of ${type} is not valid`,
          result,
        };
      }

      result.data = temp?.map((element) => {
        const { mValue } = element;
        const convertedValue = ConvertValueToUnit(type, unit, mValue);

        element.value = convertedValue.value;
        element.unit = convertedValue.unit;

        return element;
      });
    }
    result.data = FormatMetricArr(result.data);
    return result;
  }

  @Get('chart')
  async findChartData(@Query() chartMetricDto: ChartMetricDto) {
    const { type, unit } = chartMetricDto;
    const isValidUnit = MetricTracking(type, unit);
    if (!isValidUnit.isValid) {
      return {
        data: [],
        message: `${unit} is of ${type} is not valid!`,
      };
    }

    const result = await this.metricService.findChartData(chartMetricDto);
    const temp = result.data;
    result.data = temp?.map((element) => {
      const { mValue } = element;
      const convertedValue = ConvertValueToUnit(type, unit, mValue);

      element.value = convertedValue.value;
      element.unit = convertedValue.unit;

      return element;
    });

    return {
      data: FormatMetricArr(result.data),
    };
  }
}
