import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { IoIosSunny, IoMdWater } from "react-icons/io";
import { IoEye, IoLocationSharp } from "react-icons/io5";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdWaves } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import airQuality from "../../api/air_quality_api";
import weatherInfo from "../../api/weather_info_api";
import {
  airQualityAcronyms,
  days,
  months,
  todayAtHours,
  wmoWeatherCodes,
} from "../../common/comms";
import {
  CurrentAirQualityInterface,
  CurrentWeatherInterface,
  HourlyForecastStatsInterface,
  WeekForecastStatsInterface,
} from "../../common/types";
import Divisor from "../../components/Divisor";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import TodayForecastInfoCard from "../../components/TodayForecastInfoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";

export default function ForecastStats() {
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
  const location = useLocation();
  const currDate = new Date();
  const currTime = currDate.getHours();
  const currDay = currDate.getDay();
  const hourConversor = (date: Date, type: string, hasMinutes: boolean) => {
    // will make 12h shift or 24h shift conversion based on user preference
    let hours = date.getHours();
    const min = date.getMinutes();
    const minutes = min < 10 ? "0" + min : min;
    // if user wants 12h shift, type will be 12h, if not, it will be 24h
    if (type === "12h") {
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      // hasMinutes param is used to return string with 2 digits (just hours)
      return hasMinutes ? `${hours}:${minutes} ${ampm}` : `${hours} ${ampm}`;
    }
    return hasMinutes ? `${hours}:${minutes}` : `${hours}`;
  };
  const chopArray = (arr: [], chunkSize: number) => {
    const chunks = [];
    const copyArray = Array.from(arr); // Create a copy of the original array
    while (copyArray.length > 0) {
      chunks.push(copyArray.splice(0, chunkSize));
    }
    return chunks;
  };

  useEffect(() => {
    if (location) {
      setLoaderVisibility(true);
      weatherInfo
        .get("forecast", {
          params: {
            latitude: location.state.lat,
            longitude: location.state.lon,
            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,weather_code,is_day",
            daily: "sunrise,sunset",
            hourly:
              "visibility,temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day",
            timezone: "auto",
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
              "12h",
              true
            ),
            sunset: hourConversor(new Date(data.daily.sunset[0]), "12h", true),
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
                "12h",
                false
              ),
              temp: data.hourly.temperature_2m[hour].toFixed(0),
              wind_speed: data.hourly.wind_speed_10m[hour].toFixed(0),
              wind_direction: Number(data.hourly.wind_direction_10m[hour]),
              wind_icon: "./src/assets/weather_icons/direction.png",
              weather_icon: time.image,
              weather_description: time.description,
            };
            arr.push(obj);
          });
          setHourlyForecastStats(arr);

          const arr2: WeekForecastStatsInterface[] = [];
          console.log(data.hourly.is_day);

          for (let i = 0; i < 7; i++) {
            const icon = isHourlyTimeDay(
              currTime,
              chopArray(data.hourly.weather_code, 24)[i]
            );
            const obj: WeekForecastStatsInterface = {
              weather_icon: icon.image,
              temp: chopArray(data.hourly.temperature_2m, 24)[i][currTime],
              date: `${days[(currDay + i) % 7]}, ${currDate.getDate() + i} ${
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
            latitude: location.state.lat,
            longitude: location.state.lon,
            current: "pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone",
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
  }, [location, currTime]);

  return (
    <section className="mt-6 font-medium">
      <div>
        <Loader visibility={loaderVisibility} />
      </div>
      <section
        className={
          loaderVisibility
            ? "hidden"
            : "w-full flex flex-col items-center gap-4 px-3"
        }
      >
        <section className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-2xl">Now</h3>
            <h1 className="text-7xl font-bold text-slate-300">
              {todayLocalStats?.temp}°C
            </h1>
            <div className="flex flex-col items-center">
              <img
                src={todayLocalStats?.weather_icon}
                alt={todayLocalStats?.weather_description}
                className="size-20 sm:size-24"
              />
              <p className="text-sm text-zinc-600 sm:text-md md:text-xl">
                {todayLocalStats?.weather_description}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-max">
            <Divisor />
            <div className="flex items-center gap-3 text-sm text-zinc-600 sm:text-md">
              <CiCalendar className="size-5" />
              <p>
                {days[currDay]}, {currDay} {months[currDate.getMonth()]}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600 sm:text-md">
              <IoLocationSharp className="size-5" />
              <p>
                {location.state.state
                  ? `${location?.state.name}, ${location.state.state}, ${location?.state.country}`
                  : `${location?.state.name}, ${location?.state.country}`}
              </p>
            </div>
          </div>
        </section>
        <Divisor />
        <section className="flex flex-col w-full bg-light-zinc text-lg text-zinc-500 font-medium rounded-2xl px-6 py-4 gap-2 lg:gap-4">
          <h3 className="text-xl lg:text-2xl">Today's Hightlights</h3>
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:gap-4">
            <div className="bg-hard-zinc pt-3 px-3 pb-7 rounded-xl text-md">
              <h4 className="lg:text-xl">Sunrise & Sunset</h4>
              <div className="flex items-center justify-between mt-3 px-1">
                <div>
                  <div className="flex items-center gap-2">
                    <IoIosSunny className="size-8 text-white sm:size-12 lg:size-14" />
                    <div className="flex flex-col text-xl leading-none">
                      <h5 className="text-sm lg:text-md">Sunrise</h5>
                      <p className="text-white sm:text-2xl lg:text-3xl">
                        {todayLocalStats?.sunrise}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <PiMoonFill className="size-6 text-white sm:size-9 lg:size-10" />
                    <div className="flex flex-col text-xl leading-none">
                      <h5 className="text-sm lg:text-md">Sunset</h5>
                      <p className="text-white sm:text-2xl lg:text-3xl">
                        {todayLocalStats?.sunset}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-hard-zinc pt-3 px-3 pb-7 rounded-xl text-md">
              <div className="flex justify-between items-center">
                <h3 className="lg:text-xl">Air Quality</h3>
                {/* <div className="bg-green-500 text-hard-zinc px-2 rounded-xl text-sm">
                Good
              </div> */}
              </div>
              <div className="flex mt-3 justify-between items-center px-3">
                <FaWind className="size-8 text-white sm:size-10 lg:size-12" />
                {todayAirQualityStats?.map((stat) => {
                  return (
                    <div key={stat.name} className="flex flex-col items-center">
                      <h5 className="text-sm">{stat.name}</h5>
                      <p className="text-white text-2xl lg:text-3xl">
                        {stat.value}
                      </p>
                      <p className="text-xs lg:text-md">{stat.unit}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:gap-4">
            <div className="bg-hard-zinc w-full pt-3 px-3 pb-7 rounded-xl text-md">
              <h3 className="lg:text-xl">Humidity</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <IoMdWater className="size-8 sm:size-10 lg:size-12" />
                <p className="text-2xl lg:text-4xl">
                  {todayLocalStats?.relative_humidity}
                  <span className="text-lg lg:text-xl">%</span>
                </p>
              </div>
            </div>
            <div className="bg-hard-zinc w-full pt-3 px-3 pb-7 rounded-xl text-md">
              <h3 className="lg:text-xl">Pressure</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <MdWaves className="size-8 sm:size-10 lg:size-12" />
                <p className="text-2xl lg:text-4xl">
                  {todayLocalStats?.surf_pressure}
                  <span className="text-sm lg:text-xl">hPa</span>
                </p>
              </div>
            </div>
            <div className="bg-hard-zinc w-full pt-3 px-3 pb-7 rounded-xl text-md">
              <h3 className="lg:text-xl">Visibility</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <IoEye className="size-8 sm:size-10 lg:size-12" />
                <p className="text-2xl lg:text-4xl">
                  {todayLocalStats?.visibility}
                  <span className="text-sm lg:text-xl">km</span>
                </p>
              </div>
            </div>
            <div className="bg-hard-zinc w-full pt-3 px-3 pb-7 rounded-xl text-md">
              <h3 className="lg:text-xl">Feels Like</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <LiaTemperatureLowSolid className="size-8 sm:size-10 lg:size-12" />
                <p className="text-2xl lg:text-4xl">
                  {todayLocalStats?.feels_like}
                  <span className="text-sm lg:text-xl">°C</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full text-lg text-zinc-500 font-medium rounded-xl py-2 gap-2">
          <h3 className="text-xl">Today at</h3>
          <Carousel
            opts={{
              dragFree: true,
              breakpoints: { "(min-width: 1024px)": { active: false } },
            }}
            orientation="horizontal"
            className="px-0"
          >
            <CarouselContent className="w-full ml-0">
              {hourlyForecastStats.map((day) => {
                return (
                  <CarouselItem
                    key={day.hour}
                    className="flex flex-col gap-2 basis-1/2 pr-2 pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <TodayForecastInfoCard
                      infoHeader={day.hour.toString()}
                      infoIcon={day.weather_icon}
                      infoParagraph={`${day.temp.toString()}°C`}
                      infoAlt={day.weather_description}
                    />
                    <TodayForecastInfoCard
                      infoIcon={day.wind_icon}
                      infoParagraph={`${day.wind_speed.toString()}km/h`}
                      rotation_deg={day.wind_direction}
                      infoAlt={day.weather_description}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>
        <section className="flex flex-col w-full text-lg text-zinc-500 font-medium rounded-xl py-2 gap-2">
          <h3 className="text-xl">7 Days Forecast</h3>
          <Carousel
            opts={{
              dragFree: true,
              breakpoints: { "(min-width: 1024px)": { active: false } },
            }}
            orientation="horizontal"
            className="px-0"
          >
            <CarouselContent className="w-full ml-0">
              {weekForecastStats.map((day) => {
                return (
                  <CarouselItem
                    key={day.date}
                    className="basis-1/2 pr-2 pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-[14.33%]"
                  >
                    <div className="flex flex-col text-white items-left justify-center px-3 py-3 bg-light-zinc rounded-xl gap-1">
                      <img className="size-16 -ml-2" src={day.weather_icon} />
                      <h4 className="text-3xl font-medium">
                        {day.temp.toFixed(0)}°C
                      </h4>
                      <p className="text-sm text-zinc-600">{day.date}</p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>
        <Footer />
      </section>
    </section>
  );
}
