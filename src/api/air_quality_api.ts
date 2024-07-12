import axios from "axios";

const airQuality = axios.create({
  baseURL: "https://air-quality-api.open-meteo.com/v1/",
});

export default airQuality;
