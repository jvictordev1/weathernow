import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaGithub, FaSun } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoLocationSharp, IoMenu } from "react-icons/io5";
import { MdDelete, MdGpsFixed } from "react-icons/md";
import reducedlogo from "../../assets/reducedlogo.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

export default function Navbar() {
  const [isCurrentLocationActive, setIsCurrentLocationActive] = useState(false);
  const cities = [
    {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    {
      city: "Abuja",
      state: "Abuja",
      country: "Nigeria",
    },
    {
      city: "New York",
      state: "New York",
      country: "USA",
    },
    {
      city: "London",
      state: "London",
      country: "UK",
    },
  ];
  return (
    <Dialog>
      <DialogContent className="h-1/2 bg-zinc-900 py-2 border-0 w-4/5 rounded-xl">
        <DialogTitle className="hidden">Search city Dialog</DialogTitle>
        <section className="flex items-center border-b-2 border-zinc-800">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Search city..."
            className="w-full text-white bg-transparent font-medium text-xl border-zinc-800 placeholder:text-zinc-700 focus:border-white rounded-xl px-2 outline-none"
          />
        </section>
        <section className="h-full">
          <ul className="flex flex-col text-white font-medium text-md gap-4">
            {cities.map((city) => {
              return (
                <li
                  className="flex items-center justify-between"
                  key={city.city}
                >
                  <button
                    // onClick={() => changePage(!currentPageValue)}
                    className="flex items-center gap-2"
                  >
                    <IoLocationSharp className="size-6 text-zinc-500" />
                    <div className="flex items-start flex-col">
                      <h3>{city.city}</h3>
                      <p className="text-zinc-500 text-sm">
                        {city.state}, {city.country}
                      </p>
                    </div>
                  </button>
                  <button type="button" title="Click to delete">
                    <MdDelete className="size-5 text-red-400" />
                  </button>
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
        <img className="w-6" src={reducedlogo} alt="weathernow logo" />
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
