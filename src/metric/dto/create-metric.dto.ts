import { ApiProperty } from '@nestjs/swagger';
import { MetricType, MetricUnit } from 'src/constants';

export class CreateMetricDto {
  @ApiProperty({
    enum: MetricUnit,
    default: MetricUnit.METER,
  })
  unit: string;

  @ApiProperty({
    default: '',
  })
  value: string;

  @ApiProperty({
    enum: MetricType,
    default: MetricType.DISTANCE,
  })
  type: string;
}
