import axios from "axios";

const geoInstance = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0/",
});

export default geoInstance;
