export interface WeatherByCity {
  '@context': (Context | string)[];
  type: string;
  geometry: Geometry;
  properties: Properties;
}
interface Properties {
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  periods: Period[];
}
interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string;
  probabilityOfPrecipitation: ProbabilityOfPrecipitation;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}
interface ProbabilityOfPrecipitation {
  unitCode: string;
  value?: number;
}
interface Elevation {
  unitCode: string;
  value: number;
}
interface Geometry {
  type: string;
  coordinates: number[][][];
}
interface Context {
  '@version': string;
  wx: string;
  geo: string;
  unit: string;
  '@vocab': string;
}
