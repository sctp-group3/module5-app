import axios from "axios";

const API_KEY = "1e3039792caea495f5c730bd5144ded6";
const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const PRO_URL = "https://pro.openweathermap.org/data/2.5";

const baseAPI = axios.create({ baseURL: BASE_URL });
const proAPI = axios.create({ baseURL: PRO_URL });

const formatApiResponse = (data, searchParams) => {
  let {
    coord: { lat, lon },
    main: { feels_like, temp, temp_min, temp_max, humidity },
    wind: { speed },
    weather: {
      0: { description, icon },
    },
    sys: { country },
    name: backupName,
  } = data;

  //console.log(data);
  const state = searchParams.state ? ` ${searchParams.state},` : "";
  const zip = searchParams.zip ? ` (${searchParams.zip})` : "";
  const nameOverride = searchParams.name || backupName;
  const countryOverride = searchParams.country || country;
  const name = `${nameOverride},${state} ${countryOverride}${zip}`;
  return {
    name,
    lat,
    lon,
    feels_like,
    temp,
    temp_min,
    temp_max,
    humidity,
    speed,
    description,
    icon,
  };
};

const getUrl = async (searchParams) => {
  try {
    const [current, hourly, daily] = await Promise.all([
      baseAPI.get("/weather", {
        params: {
          lat: searchParams.lat,
          lon: searchParams.lng,
          appid: API_KEY,
          units: searchParams.units || "metric",
        },
      }),
      proAPI.get("/forecast/hourly", {
        params: {
          lat: searchParams.lat,
          lon: searchParams.lng,
          cnt: 20,
          appid: API_KEY,
          units: searchParams.units || "metric",
        },
      }),
      baseAPI.get("/forecast/daily", {
        params: {
          lat: searchParams.lat,
          lon: searchParams.lng,
          cnt: 15,
          appid: API_KEY,
          units: searchParams.units || "metric",
        },
      }),
    ]);
    let formattedData = formatApiResponse(current.data, searchParams);
    return {
      current: formattedData,
      hourly: hourly.data,
      daily: daily.data,
    };
  } catch (error) {
    //console.log(error.message);
  }
};

export default getUrl;
