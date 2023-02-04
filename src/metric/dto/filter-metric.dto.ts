import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MetricUnit } from 'src/constants';

export class FilterMetricDto {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional({
    enum: MetricUnit,
    default: '',
  })
  unit?: string;

  @ApiProperty({
    enum: ['DISTANCE', 'TEMPERATURE', 'ALL'],
    default: 'ALL',
  })
  type: string;
}
