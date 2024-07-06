import ForecastStats from "./components/ForecastStats";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main className="bg-radial-gradient bg-no-repeat h-screen overflow-auto">
        <Navbar />
        {/* <BackgroundAnim /> */}
        <section className="px-3">
          {/* <Landing /> */}
          <ForecastStats />
        </section>
      </main>
    </>
  );
}

export default App;
