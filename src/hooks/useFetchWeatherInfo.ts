import { useEffect, useState } from "react";
import airQuality from "../api/air_quality_api";
import weatherInfo from "../api/weather_info_api";
import {
  airQualityAcronyms,
  days,
  months,
  todayAtHours,
  wmoWeatherCodes,
} from "../common/comms";
import {
  CityInterface,
  CurrentAirQualityInterface,
  CurrentWeatherInterface,
  HourlyForecastStatsInterface,
  WeekForecastStatsInterface,
} from "../common/types";
import { hourConversor } from "../utils/hourConversor";

const currDate = new Date();
const currTime = currDate.getHours();
const currDayNum = currDate.getDay();
const chopArray = (arr: [], chunkSize: number) => {
  const chunks = [];
  const copyArray = Array.from(arr);
  while (copyArray.length > 0) {
    chunks.push(copyArray.splice(0, chunkSize));
  }
  return chunks;
};

export const useFetchWeatherInfo = (loc: CityInterface, hourType: string) => {
  const [todayLocalStats, setTodayLocalStats] =
    useState<CurrentWeatherInterface>();
  const [todayAirQualityStats, setTodayAirQualityStats] = useState<
    CurrentAirQualityInterface[]
  >([]);
  const [hourlyForecastStats, setHourlyForecastStats] = useState<
    HourlyForecastStatsInterface[]
  >([]);
  const [weekForecastStats, setWeekForecastStats] = useState<
    WeekForecastStatsInterface[]
  >([]);
  const [loaderVisibility, setLoaderVisibility] = useState(true);

  useEffect(() => {
    if (loc) {
      setLoaderVisibility(true);
      weatherInfo
        .get("forecast", {
          params: {
            latitude: loc.lat,
            longitude: loc.lon,
          },
        })
        .then((res) => {
          const data = res.data;
          const isCurrentTimeDay = data.current.is_day
            ? wmoWeatherCodes[
                data.current.weather_code as keyof typeof wmoWeatherCodes
              ].day
            : wmoWeatherCodes[
                data.current.weather_code as keyof typeof wmoWeatherCodes
              ].night;
          setTodayLocalStats({
            feels_like: data.current.apparent_temperature.toFixed(0),
            relative_humidity: data.current.relative_humidity_2m,
            surf_pressure: data.current.surface_pressure.toFixed(0),
            temp: data.current.temperature_2m.toFixed(0),
            sunrise: hourConversor(
              new Date(data.daily.sunrise[0]),
              hourType,
              true
            ),
            sunset: hourConversor(
              new Date(data.daily.sunset[0]),
              hourType,
              true
            ),
            visibility: Number(
              (data.hourly.visibility[currTime] / 1000).toFixed(0)
            ),
            weather_icon: isCurrentTimeDay.image,
            weather_description: isCurrentTimeDay.description,
          });

          const arr: HourlyForecastStatsInterface[] = [];
          const isHourlyTimeDay = (id: number, arr: string[]) => {
            return data.hourly.is_day[id]
              ? wmoWeatherCodes[arr[id] as keyof typeof wmoWeatherCodes].day
              : wmoWeatherCodes[arr[id] as keyof typeof wmoWeatherCodes].night;
          };
          todayAtHours.forEach((hour) => {
            const time = isHourlyTimeDay(hour, data.hourly.weather_code);
            const obj: HourlyForecastStatsInterface = {
              hour: hourConversor(
                new Date(data.hourly.time[hour]),
                hourType,
                false
              ),
              temp: data.hourly.temperature_2m[hour].toFixed(0),
              wind_speed: data.hourly.wind_speed_10m[hour].toFixed(0),
              wind_direction: Number(data.hourly.wind_direction_10m[hour]),
              wind_icon: "/assets/weather_icons/direction.png",
              weather_icon: time.image,
              weather_description: time.description,
            };
            arr.push(obj);
          });
          setHourlyForecastStats(arr);

          const arr2: WeekForecastStatsInterface[] = [];
          for (let i = 0; i < 7; i++) {
            const icon = isHourlyTimeDay(
              currTime,
              chopArray(data.hourly.weather_code, 24)[i]
            );
            const obj: WeekForecastStatsInterface = {
              weather_icon: icon.image,
              temp: chopArray(data.hourly.temperature_2m, 24)[i][currTime],
              date: `${days[(currDayNum + i) % 7]}, ${currDate.getDate() + i} ${
                months[currDate.getMonth()]
              }`,
            };
            arr2.push(obj);
          }
          setWeekForecastStats(arr2);
        });
      airQuality
        .get("air-quality", {
          params: {
            latitude: loc.lat,
            longitude: loc.lon,
          },
        })
        .then((res) => {
          const arr = [];
          for (const key in res.data.current) {
            if (key === "time" || key === "interval") {
              continue;
            }
            for (const stat in airQualityAcronyms) {
              if (key === stat) {
                const obj = {
                  name: airQualityAcronyms[
                    stat as keyof typeof airQualityAcronyms
                  ],
                  unit: res.data.current_units[key],
                  value: res.data.current[key],
                };
                arr.push(obj);
              }
            }
          }
          setTodayAirQualityStats(arr);
        })
        .finally(() => {
          setLoaderVisibility(false);
        });
    }
  }, [loc]);
  return {
    weekForecastStats,
    hourlyForecastStats,
    todayAirQualityStats,
    todayLocalStats,
    loaderVisibility,
    currDayNum,
    currDate,
  };
};
