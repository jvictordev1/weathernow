import { CiCalendar } from "react-icons/ci";
import { FaMoon, FaWind } from "react-icons/fa";
import { IoIosSunny, IoMdWater } from "react-icons/io";
import { IoEye, IoLocationSharp } from "react-icons/io5";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdWaves } from "react-icons/md";
import Divisor from "../Divisor";

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
  return (
    <section className="flex flex-col text-white items-center gap-3 w-full py-8">
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
      <section className="w-full">
        <section className="flex flex-col bg-zinc-900 text-lg text-zinc-500 font-medium rounded-md px-4 py-2 gap-2">
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
      </section>
    </section>
  );
}
