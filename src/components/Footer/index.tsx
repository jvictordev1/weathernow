import Divisor from "../Divisor";

export default function Footer() {
  return (
    <>
      <Divisor />
      <footer className="w-full font-medium flex items-center justify-center gap-2 py-2 mb-4">
        <h2 className="text-xs sm:text-xl">
          Powered by OpenWeather and Open-Meteo.
        </h2>
      </footer>
    </>
  );
}
