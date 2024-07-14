import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast, Toaster } from "sonner";
import GuardComponent from "../components/GuardComponent";
import Navbar from "../components/Navbar";
import ForecastStatsPage from "./ForecastStatsPage";
import LandingPage from "./LandingPage";
export default function AppRouter() {
  const [sonnerPromise, setSonnerPromise] =
    useState<Promise<GeolocationPosition>>();
  useEffect(() => {
    if (sonnerPromise) {
      toast.promise(sonnerPromise, {
        loading: "Searching...",
        success: "Found your location!",
        error:
          "Error. Either you denied the request or your browser does not support geolocation.",
      });
    }
  }, [sonnerPromise]);
  return (
    <main className="bg-radial-gradient text-white bg-no-repeat h-screen overflow-auto">
      <Router>
        <Navbar
          toastPromise={(promise: Promise<GeolocationPosition>) =>
            setSonnerPromise(promise)
          }
        />
        <section className="mx-2 sm:mx-6">
          <Toaster richColors theme="system" />
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
