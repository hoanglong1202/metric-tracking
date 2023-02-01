import { ApiProperty } from '@nestjs/swagger';
import { MetricType, MetricUnit } from 'src/constants';

export class CreateMetricDto {
  @ApiProperty({
    enum: MetricUnit,
    default: MetricUnit.METER,
  })
  unit: string;

  @ApiProperty({
    default: 0,
  })
  value: number;

  @ApiProperty({
    enum: MetricType,
    default: MetricType.DISTANCE,
  })
  type: string;

  mValue: number;

  date: Date;
}
