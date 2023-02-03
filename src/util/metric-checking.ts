import {
  MetricType,
  MetricUnitDistance,
  MetricUnitTemperature,
} from 'src/constants';

export const MetricTracking = (type: string, unit: string) => {
  let result = false;
  if (
    type === MetricType.DISTANCE &&
    (<any>Object).values(MetricUnitDistance).includes(unit)
  ) {
    result = true;
  }

  if (
    type === MetricType.TEMPERATURE &&
    (<any>Object).values(MetricUnitTemperature).includes(unit)
  ) {
    result = true;
  }

  return result;
};
