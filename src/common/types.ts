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
}

export interface CurrentAirQualityInterface {
  name: string;
  unit: string;
  value: number;
}
export interface AirQualityAcronymsInterface {
  pm2_5: string;
  nitrogen_dioxide: string;
  sulphur_dioxide: string;
  ozone: string;
}
