import axios from "axios";

const airQuality = axios.create({
  baseURL: "https://air-quality-api.open-meteo.com/v1/",
  params: {
    current: "pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone",
  },
});

export default airQuality;
