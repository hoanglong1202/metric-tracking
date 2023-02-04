import {
  MetricType,
  MetricUnitDistance,
  MetricUnitTemperature,
} from 'src/constants';

export const MetricMinValueConverter = (
  value: number,
  unit: string,
  type: string,
) => {
  const result = {
    isValid: true,
    mValue: 0,
  };
  if (
    type === MetricType.DISTANCE &&
    (<any>Object).values(MetricUnitDistance).includes(unit) &&
    value >= 0
  ) {
    result.mValue = ConvertToCentimeter(value, unit);
  } else if (
    type === MetricType.TEMPERATURE &&
    (<any>Object).values(MetricUnitTemperature).includes(unit)
  ) {
    result.mValue = ConvertToCelsius(value, unit);
  } else {
    result.isValid = false;
  }

  return result;
};

export const ConvertToCentimeter = (value: number, unit: string) => {
  switch (unit) {
    case 'METER':
      return value * 100;
    case 'INCH':
      return value * 2.54;
    case 'YARD':
      return value * 91.44;
    case 'FEET':
      return value * 30.48;
    default:
      break;
  }

  return value;
};

export const ConvertToCelsius = (value: number, unit: string) => {
  switch (unit) {
    case 'FAHRENHEIT':
      return (value - 32) * (5 / 9);
    case 'KELVIN':
      return value - 273.15;
    default:
      break;
  }

  return value;
};

export const ConvertCentimeterToUnit = (value: number, unit: string) => {
  switch (unit) {
    case 'METER':
      return value / 100;
    case 'INCH':
      return value / 2.54;
    case 'YARD':
      return value / 91.44;
    case 'FEET':
      return value / 30.48;
    default:
      break;
  }

  return value;
};

export const ConvertCelsiusToUnit = (value: number, unit: string) => {
  switch (unit) {
    case 'FAHRENHEIT':
      return value * (9 / 5) + 32;
    case 'KELVIN':
      return value + 273.15;
    default:
      break;
  }

  return value;
};

export const ConvertValueToUnit = (
  type: string,
  unit: string,
  mValue: number,
) => {
  const result = {
    unit,
    value: mValue,
  };

  if (type === MetricType.DISTANCE) {
    result.value = ConvertCentimeterToUnit(mValue, unit);
  }

  if (type === MetricType.TEMPERATURE) {
    result.value = ConvertCelsiusToUnit(mValue, unit);
  }

  return result;
};
