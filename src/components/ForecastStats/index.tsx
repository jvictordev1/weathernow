import { CiCalendar } from "react-icons/ci";
import { FaMoon, FaWind } from "react-icons/fa";
import { IoIosSunny, IoMdWater } from "react-icons/io";
import { IoEye, IoLocationSharp } from "react-icons/io5";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdWaves } from "react-icons/md";
import Divisor from "../Divisor";
import Footer from "../Footer";
import TodayForecastInfoCard from "../TodayForecastInfoCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function ForecastStats() {
  const airQualityStats = [
    { name: "PM25", value: 3.9 },
    { name: "SO2", value: 7.75 },
    {
      name: "NO2",
      value: 32.75,
    },
    { name: "O3", value: 38.6 },
  ];
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
  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-xl">Now</h3>
          <h1 className="text-7xl font-bold text-slate-300">5°C</h1>
          <p className="text-sm text-zinc-600">Broken Clouds</p>
        </div>
        <Divisor />
        <div className="flex items-center gap-1 text-sm text-zinc-600">
          <CiCalendar className="size-5" />
          <p>Wednesday, 1 Mar.</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-600">
          <IoLocationSharp className="size-5" />
          <p>London, GB</p>
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
                  <p className="text-white font-bold">06:30 AM</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <FaMoon className="size-7 text-white" />
                <div className="flex flex-col text-xl leading-none">
                  <h5 className="text-sm">Sunset</h5>
                  <p className="text-white font-bold">07:23 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-950 pt-3 px-3 pb-7 rounded-md text-md">
          <div className="flex justify-between items-center">
            <h3>Air Quality</h3>
            <div className="bg-green-500 text-zinc-950 px-2 rounded-xl text-sm">
              Good
            </div>
          </div>
          <div className="flex mt-3 justify-between items-center px-3">
            <FaWind className="size-10 text-white" />
            {airQualityStats.map((stat) => {
              return (
                <div className="flex flex-col items-center">
                  <h5 className="text-sm">{stat.name}</h5>
                  <p className="text-white text-2xl">{stat.value}</p>
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
                82<span className="text-xl">%</span>
              </p>
            </div>
          </div>
          <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
            <h3>Pressure</h3>
            <div className="flex items-center text-white mt-3 justify-between px-1">
              <MdWaves className="size-10" />
              <p className="text-2xl">30.12in</p>
            </div>
          </div>
          <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
            <h3>Visibility</h3>
            <div className="flex items-center text-white mt-3 justify-between px-1">
              <IoEye className="size-10" />
              <p className="text-3xl">20mi</p>
            </div>
          </div>
          <div className="bg-zinc-950 w-full pt-3 px-3 pb-7 rounded-md text-md">
            <h3>Feels Like</h3>
            <div className="flex items-center text-white mt-3 justify-between px-1">
              <LiaTemperatureLowSolid className="size-10" />
              <p className="text-3xl">2°C</p>
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
    </>
  );
}
