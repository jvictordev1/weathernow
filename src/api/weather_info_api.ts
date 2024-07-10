import axios from "axios";

const weatherInfo = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export default weatherInfo;
