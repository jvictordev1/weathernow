export interface CityInterface {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}
export interface TodayHighlightsInterface {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  visibility: number;
  description: string;
  icon: string;
}
