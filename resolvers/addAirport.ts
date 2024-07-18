import { Request, Response } from "npm:express@4.19.2";
import { AirportModel } from "../db/airport.ts";
import { getInfoFromAiport } from "../lib/apifunctions.ts";
export const addAirport = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      res.status(400).send("Name is required");
    }

    const AirportInfo = await getInfoFromAiport(name);
    console.log(AirportInfo);

    const airport = new AirportModel({
      name: AirportInfo.name,
      city: AirportInfo.city,
      country: AirportInfo.country,
    });

    await airport.save();
    return res.status(200).send(airport);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
