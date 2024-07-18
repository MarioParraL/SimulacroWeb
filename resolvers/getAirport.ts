import { Request, Response } from "npm:express@4.19.2";
import { AirportModel } from "../db/airport.ts";
import { getInfoFromAir, getInfoFromCity } from "../lib/apifunctions.ts";

export const getAirport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const airport = await AirportModel.findById(id).exec();

    if (!airport) {
      res.status(404).send("Airport not founded");
      return;
    }

    const AirportQualityAir = await getInfoFromAir(airport.city);
    const AirportCityPopulation = await getInfoFromCity(airport.city);

    res.status(200).send({
      name: airport.name,
      city: airport.city,
      country: airport.country,
      airQuality: AirportQualityAir.overall_aqi,
      cityPopulation: AirportCityPopulation.population,
      id: airport._id,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
