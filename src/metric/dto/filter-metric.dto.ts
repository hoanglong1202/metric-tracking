import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilterMetricDto {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  unit?: string;

  @ApiProperty({
    enum: ['DISTANCE', 'TEMPERATURE', 'ALL'],
    default: 'ALL',
  })
  type: string;
}
