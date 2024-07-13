import Divisor from "../Divisor";

export default function Footer() {
  return (
    <>
      <Divisor />
      <footer className="w-full font-medium flex items-center justify-center gap-2 py-2 mb-4">
        <h2 className="text-lg">Powered by</h2>
        <img
          className="w-20"
          src="../src/assets/openweatherlogo.png"
          alt="OpenWeather logo"
        />
      </footer>
    </>
  );
}
