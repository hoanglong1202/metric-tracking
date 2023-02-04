import {
  MetricType,
  MetricUnitDistance,
  MetricUnitTemperature,
} from 'src/constants';

interface IResult {
  isValid: boolean;
  unit?: string;
  type?: string;
}

export const MetricTracking = (type: string, unit: string) => {
  const result: IResult = {
    isValid: false,
    unit,
    type,
  };
  if (
    type === MetricType.DISTANCE &&
    (<any>Object).values(MetricUnitDistance).includes(unit)
  ) {
    result.isValid = true;
  }

  if (
    type === MetricType.TEMPERATURE &&
    (<any>Object).values(MetricUnitTemperature).includes(unit)
  ) {
    result.isValid = true;
  }

  return result;
};
