export interface IGridPoints {
  gridX: number;
  gridY: number;
}

export interface IResults {
  addressMatches: any;
}

interface IForecastStandardValues {
  unitCode: string;
  value: number;
}

export interface IForecast {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string;
  probabilityOfPrecipitation: IForecastStandardValues;
  dewpoint: IForecastStandardValues;
  relativeHumidity: IForecastStandardValues;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}
