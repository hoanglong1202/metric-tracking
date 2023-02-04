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
    default: new Date(),
  })
  fromDate: Date;

  @ApiProperty({
    default: new Date(),
  })
  toDate: Date;
}
