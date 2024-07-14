import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FaGithub, FaSun } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoLocationSharp, IoMenu } from "react-icons/io5";
import { MdGpsFixed } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import geoInstance from "../../api/geocoding_api";
import { CityInterface } from "../../common/types";
import Loader from "../Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import logo from "/assets/logo.svg";
import reducedlogo from "/assets/reducedlogo.svg";

interface NavbarInterface {
  toastPromise: (promise: Promise<GeolocationPosition>) => void;
}

export default function Navbar({ toastPromise }: NavbarInterface) {
  const [isCurrentLocationActive, setIsCurrentLocationActive] = useState(false);
  const [searchedCity, setSearchedCity] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [modalState, setModalState] = useState(false);
  const nav = useNavigate();

  const filterDuplicates = (cities: CityInterface[]) => {
    return cities.filter(
      (city: CityInterface, index: number, self: CityInterface[]) =>
        index ===
        self.findIndex(
          (t: CityInterface) => t.name === city.name && t.state === city.state
        )
    );
  };
  const getUserCurrentLocation = async () => {
    if (isCurrentLocationActive) {
      return;
    }
    const posPromise = new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    toastPromise(posPromise);
    posPromise
      .then((pos) => {
        geoInstance
          .get("reverse", {
            params: {
              lon: pos.coords.longitude,
              lat: pos.coords.latitude,
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
              limit: 1,
            },
          })
          .then((res) => {
            setIsCurrentLocationActive(true);
            nav("forecast", { state: res.data[0] });
          });
      })
      .catch(() => {
        return;
      });
  };
  const onCitySelected = () => {
    setModalState(!modalState);
    if (isCurrentLocationActive) {
      setIsCurrentLocationActive(false);
    }
  };

  useEffect(() => {
    if (searchedCity) {
      setLoaderVisibility(true);
      const data = setTimeout(() => {
        geoInstance
          .get("direct", {
            params: {
              q: searchedCity,
              limit: 10,
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            },
          })
          .then((res) => {
            setCities(filterDuplicates(res.data));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoaderVisibility(false);
          });
      }, 500);
      return () => {
        clearTimeout(data);
        setLoaderVisibility(false);
      };
    }
    setCities([]);
    setLoaderVisibility(false);
  }, [searchedCity]);
  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogContent className="flex flex-col h-1/2 bg-zinc-900 py-2 border-0 w-4/5 rounded-xl sm:w-2/3">
        <DialogTitle className="hidden">Search city Dialog</DialogTitle>
        <section className="flex h-20 items-center border-b-2 border-zinc-800">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Search city..."
            className="w-full text-white bg-transparent font-medium text-xl border-zinc-800 placeholder:text-zinc-700 focus:border-white rounded-xl px-2 outline-none"
            onChange={(e) => setSearchedCity(e.target.value)}
            value={searchedCity}
          />
          <Loader visibility={loaderVisibility} />
        </section>
        <section className="flex flex-col h-full items-center overflow-scroll">
          <ul className="flex w-full flex-col text-white font-medium text-md gap-4">
            {cities.map((city) => {
              return (
                <li
                  className="flex items-center justify-between"
                  key={city.lat + city.lon}
                >
                  <Link
                    to="forecast"
                    state={city}
                    onClick={onCitySelected}
                    className="flex items-center w-full gap-2"
                  >
                    <IoLocationSharp className="size-6 text-zinc-500" />
                    <div className="flex items-start flex-col">
                      <h3>{city.name}</h3>
                      <p className="text-zinc-500 text-sm">
                        {city.state ? `${city.state}, ` : null}
                        {city.country}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <DialogFooter>
          <DialogClose className="w-full bg-red-500 rounded-lg py-2 text-white text-md font-medium hover:bg-red-600 transition-all duration-150">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <nav className="flex items-center text-white font-medium w-full justify-between py-5 px-4 border-b-2 border-zinc-900 sm:px-14 lg:px-24">
        <Link
          to="/"
          onClick={() =>
            isCurrentLocationActive ? setIsCurrentLocationActive(false) : null
          }
        >
          <img
            className="w-6 sm:hidden"
            title="Return to home page"
            src={reducedlogo}
            alt="weathernow logo"
          />
          <img
            className="hidden sm:flex w-32"
            src={logo}
            alt="weathernow logo"
          />
        </Link>
        <ul className="flex items-center gap-3 md:gap-10">
          <li>
            <DialogTrigger title="Search city" className="flex">
              <IoMdSearch className="size-6" />
            </DialogTrigger>
          </li>
          <li>
            <button
              onClick={getUserCurrentLocation}
              className={
                isCurrentLocationActive
                  ? "flex text-red-400"
                  : "flex text-white"
              }
              title={
                isCurrentLocationActive
                  ? "Using current location"
                  : "Use current location"
              }
            >
              <MdGpsFixed className="size-6 transition-colors delay-75" />
            </button>
          </li>
          <li className="flex transition-all duration-75 md:hidden">
            <Dropdown>
              <DropdownTrigger>
                <button className="px-0 py-0">
                  <IoMenu className="size-6" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                className="text-white bg-zinc-950 px-1 py-2 rounded-xl"
                aria-label="Static Actions"
              >
                <DropdownItem
                  className="justify-items-start gap-2"
                  startContent={<FaGithub className="size-4" />}
                  key="github"
                >
                  <a
                    href="https://github.com/jvictordev1/weathernow"
                    target="_blank"
                  >
                    Github
                  </a>
                </DropdownItem>
                <DropdownItem
                  className="justify-start"
                  startContent={<FaSun className="size-4" />}
                  key="color-mode"
                >
                  Light
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="hidden md:flex">
            <RiMoonClearFill className="size-5" />
            {/* <FaSun className="size-5" /> */}
          </li>
          <li className="hidden md:flex">
            <a
              className="cursor-pointer"
              title="Click here to see the GitHub repository"
              href="https://github.com/jvictordev1/weathernow"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </Dialog>
  );
}
