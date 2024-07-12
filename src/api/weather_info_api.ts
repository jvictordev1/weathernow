import axios from "axios";

const weatherInfo = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
});

export default weatherInfo;
