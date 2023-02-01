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
