import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

type AiportInfo = {
  name: string;
  city: string;
  country: string;
};
export const getInfoFromAiport = async (name: string): Promise<AiportInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY found!");
  }
  const url = "https://api.api-ninjas.com/v1/airports?name=" + name;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  if (data.status !== 200) {
    console.error("Error", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response[0];
};

type AirQualityInfo = {
  overall_aqi: string;
};

export const getInfoFromAir = async (city: string): Promise<AirQualityInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY found!");
  }
  const url = "https://api.api-ninjas.com/v1/airquality?city=" + city;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  if (data.status !== 200) {
    console.error("Error", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response;
};

type CityInfo = {
  population: string;
};

export const getInfoFromCity = async (city: string, country: string): Promise<CityInfo> => {
  const API_KEY = Deno.env.get("API_KEY") || env.API_KEY;
  if (!API_KEY) {
    throw new Error("Not API_KEY found!");
  }
  const url = "https://api.api-ninjas.com/v1/city?name=" + city;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  if (data.status !== 200) {
    console.error("Error", data.status, data.statusText);
    throw new Error("Error");
  }

  const response = await data.json();
  return response[0];
};
