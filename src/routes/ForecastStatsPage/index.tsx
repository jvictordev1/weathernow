import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaMoon, FaWind } from "react-icons/fa";
import { IoIosSunny, IoMdWater } from "react-icons/io";
import { IoEye, IoLocationSharp } from "react-icons/io5";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdWaves } from "react-icons/md";
import { useLocation } from "react-router-dom";
import airQuality from "../../api/air_quality_api";
import weatherInfo from "../../api/weather_info_api";
import { airQualityAcronyms } from "../../common/air_quality_acronyms";
import { days, months } from "../../common/calendar";
import {
  AirQualityAcronymsInterface,
  CurrentAirQualityInterface,
  CurrentWeatherInterface,
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
  const todayAt = [
    {
      time: "12 AM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "5°C",
      wind: "5 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
    {
      time: "6 AM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "7°C",
      wind: "12 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
    {
      time: "9 AM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "9°C",
      wind: "10 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
    {
      time: "12 PM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "12°C",
      wind: "8 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
    {
      time: "3 PM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "10°C",
      wind: "10 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
    {
      time: "7 PM",
      icon: "../src/assets/weather_icons/02n.png",
      temp: "6°C",
      wind: "9 km/h",
      orientationIcon: "../src/assets/weather_icons/direction.png",
    },
  ];
  const weekForecast = [
    {
      icon: "../src/assets/weather_icons/01n.png",
      temp: "5°C",
      date: "2 Mar., Mon.",
    },
    {
      icon: "../src/assets/weather_icons/02n.png",
      temp: "7°C",
      date: "3 Mar., Tue.",
    },
    {
      icon: "../src/assets/weather_icons/09n.png",
      temp: "9°C",
      date: "4 Mar., Wed.",
    },
    {
      icon: "../src/assets/weather_icons/09n.png",
      temp: "12°C",
      date: "5 Mar., Thu.",
    },
    {
      icon: "../src/assets/weather_icons/13n.png",
      temp: "10°C",
      date: "6 Mar., Fri.",
    },
    {
      icon: "../src/assets/weather_icons/11n.png",
      temp: "6°C",
      date: "7 Mar., Sat.",
    },
  ];
  const [todayLocalStats, setTodayLocalStats] =
    useState<CurrentWeatherInterface>();
  const [todayAirQualityStats, setTodayAirQualityStats] =
    useState<CurrentAirQualityInterface[]>();
  const [loaderVisibility, setLoaderVisibility] = useState(true);
  const location = useLocation();
  const currDate = new Date();
  const currTime = currDate.getHours();
  const currDay = currDate.getDay();

  useEffect(() => {
    if (location) {
      setLoaderVisibility(true);
      weatherInfo
        .get(
          `?latitude=${location.state.lat}&longitude=${location.state.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure&daily=sunrise,sunset&hourly=visibility&timezone=auto&forecast_days=1`
        )
        .then((res) => {
          const data = res.data;
          setTodayLocalStats({
            feels_like: data.current.apparent_temperature.toFixed(0),
            relative_humidity: data.current.relative_humidity_2m,
            surf_pressure: data.current.surface_pressure.toFixed(0),
            temp: data.current.temperature_2m.toFixed(0),
            sunrise: data.daily.sunrise[0].split("T")[1],
            sunset: data.daily.sunset[0].split("T")[1],
            visibility: Number(
              (data.hourly.visibility[currTime] / 1000).toFixed(0)
            ),
          });
          setLoaderVisibility(false);
        });
      airQuality
        .get(
          `?latitude=${location.state.lat}&longitude=${location.state.lon}&current=pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone`
        )
        .then((res) => {
          const arr = [];
          console.log(res.data);
          for (const key in res.data.current) {
            if (key === "time" || key === "interval") {
              continue;
            }
            for (const stat in airQualityAcronyms) {
              if (key === stat) {
                const obj = {
                  name: airQualityAcronyms[
                    stat as keyof AirQualityAcronymsInterface
                  ],
                  unit: res.data.current_units[key],
                  value: res.data.current[key],
                };
                arr.push(obj);
              }
            }
          }
          setTodayAirQualityStats(arr);
        });
    }
  }, [location, currTime]);

  return (
    <>
      <div className="mt-10">
        <Loader visibility={loaderVisibility} />
      </div>
      <section
        className={
          loaderVisibility
            ? "hidden"
            : "w-full flex flex-col items-center gap-4 mt-7 px-3 py-2"
        }
      >
        <section className="flex flex-col gap-2">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl">Now</h3>
            <h1 className="text-7xl font-bold text-slate-300">
              {todayLocalStats?.temp}°C
            </h1>
            {/* <img
              src={todayLocalStats?.icon}
              alt={todayLocalStats?.description}
              className="w-14"
            /> */}
            {/* <p className="text-sm text-zinc-600">
              {todayLocalStats?.description}
            </p> */}
          </div>
          <Divisor />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-sm text-zinc-600">
              <CiCalendar className="size-5" />
              <p>
                {days[currDay]}, {currDay} {months[currDate.getMonth()]}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-zinc-600">
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
        <section className="flex flex-col w-full bg-zinc-900 text-lg text-zinc-500 font-medium rounded-md px-4 py-2 gap-2">
          <h3 className="text-xl">Today's Hightlights</h3>
          <div className="bg-zinc-950 pt-3 px-3 pb-7 rounded-md text-md">
            <h4>Sunrise & Sunset</h4>
            <div className="flex items-center justify-between mt-3 px-3">
              <div>
                <div className="flex items-center gap-2">
                  <IoIosSunny className="size-8 text-white" />
                  <div className="flex flex-col text-xl leading-none">
                    <h5 className="text-sm">Sunrise</h5>
                    <p className="text-white font-bold">
                      {todayLocalStats?.sunrise} AM
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <FaMoon className="size-7 text-white" />
                  <div className="flex flex-col text-xl leading-none">
                    <h5 className="text-sm">Sunset</h5>
                    <p className="text-white font-bold">
                      {todayLocalStats?.sunset} PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 pt-3 px-3 pb-7 rounded-md text-md">
            <div className="flex justify-between items-center">
              <h3>Air Quality</h3>
              {/* <div className="bg-green-500 text-zinc-950 px-2 rounded-xl text-sm">
                Good
              </div> */}
            </div>
            <div className="flex mt-3 justify-between items-center px-3">
              <FaWind className="size-10 text-white" />
              {todayAirQualityStats?.map((stat) => {
                return (
                  <div key={stat.name} className="flex flex-col items-center">
                    <h5 className="text-sm">{stat.name}</h5>
                    <p className="text-white text-2xl">{stat.value}</p>
                    <p className="text-xs">{stat.unit}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
              <h3>Humidity</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <IoMdWater className="size-10" />
                <p className="text-3xl">
                  {todayLocalStats?.relative_humidity}
                  <span className="text-xl">%</span>
                </p>
              </div>
            </div>
            <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
              <h3>Pressure</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <MdWaves className="size-10" />
                <p className="text-2xl">{todayLocalStats?.surf_pressure}hPa</p>
              </div>
            </div>
            <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
              <h3>Visibility</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <IoEye className="size-10" />
                <p className="text-3xl">{todayLocalStats?.visibility}km</p>
              </div>
            </div>
            <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
              <h3>Feels Like</h3>
              <div className="flex items-center text-white mt-3 justify-between px-1">
                <LiaTemperatureLowSolid className="size-10" />
                <p className="text-3xl">{todayLocalStats?.feels_like}°C</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full text-lg text-zinc-500 font-medium rounded-md px-4 py-2 gap-2">
          <h3 className="text-xl">Today at</h3>
          <Carousel opts={{ dragFree: true }} orientation="horizontal">
            <CarouselContent className="w-full">
              {todayAt.map((day) => {
                return (
                  <CarouselItem
                    key={day.time}
                    className="flex flex-col gap-2 basis-1/2"
                  >
                    <TodayForecastInfoCard
                      infoHeader={day.time}
                      infoIcon={day.icon}
                      infoParagraph={day.temp}
                    />
                    <TodayForecastInfoCard
                      infoIcon={day.orientationIcon}
                      infoParagraph={day.wind}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>
        <section className="flex flex-col w-full text-lg text-zinc-500 font-medium rounded-md px-4 py-2 gap-2">
          <h3 className="text-xl">Week Forecast</h3>
          <Carousel opts={{ dragFree: true }} orientation="horizontal">
            <CarouselContent className="w-full">
              {weekForecast.map((day) => {
                return (
                  <CarouselItem key={day.date} className="basis-1/2">
                    <div className="flex flex-col text-white items-left justify-center px-3 py-3 bg-zinc-900 rounded-xl gap-1">
                      <img className="size-10" src={day.icon} />
                      <h4 className="text-3xl font-medium">{day.temp}</h4>
                      <p className="text-md text-zinc-600">{day.date}</p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>
        <Footer />
      </section>
    </>
  );
}
