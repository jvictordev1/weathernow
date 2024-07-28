import axios from "axios";

const weatherInfo = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
  params: {
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,weather_code,is_day",
    daily: "sunrise,sunset",
    hourly:
      "visibility,temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day",
    timezone: "auto",
  },
});

export default weatherInfo;
