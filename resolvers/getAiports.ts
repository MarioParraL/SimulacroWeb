import { Request, Response } from "npm:express@4.19.2";
import { AirportModel } from "../db/airport.ts";
import { getInfoFromAir, getInfoFromCity } from "../lib/apifunctions.ts";

export const getAllAirports = async (req: Request, res: Response) => {
  try {
    const airports = await AirportModel.find().exec();

    if (!airports) {
      res.status(404).send("No airport/s founded");
    }
    const airportsMostrar = [];
    for (let index = 0; index < airports.length; index++) {
      const AirportQualityAir = await getInfoFromAir(airports[index].city);
      const AirportCityPopulation = await getInfoFromCity(airports[index].city);

      airportsMostrar.push({
        name: airports[index].name,
        city: airports[index].city,
        country: airports[index].country,
        airQuality: AirportQualityAir.overall_aqi,
        cityPopulation: AirportCityPopulation.population,
        id: airports[index]._id,
      });
    }

    res.status(200).send(
      airportsMostrar
    );
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
