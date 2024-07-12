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
import { Link } from "react-router-dom";
import geoInstance from "../../api/geocoding_api";
import reducedlogo from "../../assets/reducedlogo.svg";
import { CityInterface } from "../../common/types";
import Loader from "../Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

export default function Navbar() {
  const [isCurrentLocationActive, setIsCurrentLocationActive] = useState(false);
  const [searchedCity, setSearchedCity] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    if (searchedCity) {
      setLoaderVisibility(true);
      const data = setTimeout(() => {
        geoInstance
          .get(
            `direct?q=${searchedCity}&limit=10&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
          )
          .then((res) => {
            setCities(
              res.data.filter(
                (city: CityInterface, index: number, self: CityInterface[]) =>
                  index ===
                  self.findIndex(
                    (t: CityInterface) =>
                      t.name === city.name && t.state === city.state
                  )
              )
            );
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
      <DialogContent className="flex flex-col justify-between h-1/2 bg-zinc-900 py-2 border-0 w-4/5 rounded-xl">
        <DialogTitle className="hidden">Search city Dialog</DialogTitle>
        <section className="flex h-14 items-center border-b-2 border-zinc-800">
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
        <section className="flex flex-col items-center">
          <ul className="flex w-full flex-col text-white font-medium h-56 text-md overflow-scroll gap-4">
            {cities.map((city) => {
              return (
                <li
                  className="flex items-center justify-between"
                  key={city.lat + city.lon}
                >
                  <Link
                    to="forecast"
                    state={city}
                    onClick={() => setModalState(!modalState)}
                    className="flex items-center gap-2"
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
          <DialogClose className="w-full bg-red-500 rounded-lg py-2 text-white text-md font-medium">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <nav className="flex items-center text-white font-medium w-full justify-between py-5 px-6 border-b-2 border-zinc-900">
        {/* <img className="w-24" src={logo} alt="weathernow logo" /> */}
        <Link to="/">
          <img
            className="w-6"
            title="Return to home page"
            src={reducedlogo}
            alt="weathernow logo"
          />
        </Link>

        <ul className="flex items-center gap-3">
          <li>
            <DialogTrigger title="Search city" className="flex">
              <IoMdSearch className="size-6" />
            </DialogTrigger>
            {/* <input
          className="bg-dark-search-icon focus:bg-light-search-icon bg-[length:23px] bg-[position:5px] bg-transparent bg-no-repeat text-sm border-2 outline-none border-zinc-800 focus:border-zinc-100 rounded-lg px-8 py-1 placeholder:text-zinc-800"
          placeholder="Search city..."
          type="text"
          name="location"
          id="location"
        /> */}
          </li>
          <li>
            <button
              onClick={() =>
                setIsCurrentLocationActive(!isCurrentLocationActive)
              }
              className={
                isCurrentLocationActive
                  ? "flex text-red-400"
                  : "flex text-white"
              }
              title="Use current location"
            >
              <MdGpsFixed className="size-6 transition-colors delay-75" />
            </button>
          </li>
          <li className="flex transition-all duration-75">
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
            {/* <FaGithub className="size-6" /> */}
            {/* <a className="cursor-pointer" href="#" target="_blank">
            Github
          </a> */}
          </li>
          <li>
            {/* <RiMoonClearFill className="size-5" /> */}
            {/* <FaSun className="size-5" /> */}
          </li>
        </ul>
      </nav>
    </Dialog>
  );
}
