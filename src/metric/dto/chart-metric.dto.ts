import { ApiProperty } from '@nestjs/swagger';
import { MetricUnit } from 'src/constants';

export class ChartMetricDto {
  @ApiProperty({
    enum: MetricUnit,
    default: MetricUnit.CENTIMETER,
  })
  unit?: string;

  @ApiProperty({
    enum: ['DISTANCE', 'TEMPERATURE'],
    default: 'DISTANCE',
  })
  type: string;

  @ApiProperty({
    enum: ['CURRENT_MONTH', 'ALL'],
    default: 'CURRENT_MONTH',
  })
  time: string;
}
