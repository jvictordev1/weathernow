export interface CityInterface {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}
export interface CurrentWeatherInterface {
  feels_like: number;
  relative_humidity: number;
  surf_pressure: number;
  temp: number;
  sunrise: string;
  sunset: string;
  visibility: number;
  weather_icon: string;
  weather_description: string;
}

export interface CurrentAirQualityInterface {
  name: string;
  unit: string;
  value: number;
}

export interface HourlyForecastStatsInterface {
  hour: string;
  temp: number;
  wind_icon: string;
  wind_speed: number;
  wind_direction: number;
  weather_icon: string;
  weather_description: string;
}

export interface WeekForecastStatsInterface {
  weather_icon: string;
  temp: number;
  date: string;
}
