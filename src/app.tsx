import ForecastStats from "./components/ForecastStats";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main className="bg-radial-gradient bg-no-repeat h-screen overflow-auto">
        <Navbar />
        {/* <BackgroundAnim /> */}
        <section className="flex flex-col items-center text-white gap-3 px-3 py-8">
          {/* <Landing /> */}
          <ForecastStats />
        </section>
      </main>
    </>
  );
}

export default App;
