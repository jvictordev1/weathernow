import { FaSun } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="flex items-center text-white font-medium w-full justify-between py-7 px-32 border-b-2 border-zinc-900">
      <img className="w-40" src="src\assets\logo.svg" alt="weathernow logo" />
      <div className="flex gap-2">
        <input
          className="bg-dark-search-icon focus:bg-light-search-icon bg-[length:23px] bg-[position:5px] bg-transparent bg-no-repeat text-sm border-2 outline-none border-zinc-800 focus:border-zinc-100 rounded-lg px-8 py-1 placeholder:text-zinc-800"
          placeholder="Search city..."
          type="text"
          name="location"
          id="location"
        />
        <button type="button" title="Use current location">
          <MdGpsFixed className="size-6" />
        </button>
      </div>
      <ul className="flex gap-24">
        <li className="hover:border-b-2 transition-all duration-75">
          <a className="cursor-pointer" href="#" target="_blank">
            Github
          </a>
        </li>
        <li>
          <button type="button">
            {/* <RiMoonClearFill className="size-5" /> */}
            <FaSun className="size-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
