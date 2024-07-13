import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GuardComponent from "../components/GuardComponent";
import Navbar from "../components/Navbar";
import ForecastStatsPage from "./ForecastStatsPage";
import LandingPage from "./LandingPage";
export default function AppRouter() {
  return (
    <main className="bg-radial-gradient text-white bg-no-repeat h-screen overflow-auto">
      <Router>
        <Navbar />
        <section className="mx-1 sm:mx-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<GuardComponent />}>
              <Route path="forecast" element={<ForecastStatsPage />} />
            </Route>
          </Routes>
        </section>
      </Router>
    </main>
  );
}
