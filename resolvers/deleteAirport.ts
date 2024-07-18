import { Request, Response } from "npm:express@4.19.2";
import { AirportModel } from "../db/airport.ts";

export const deleteAirport = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const airport = await AirportModel.findByIdAndDelete(_id);
    if (!airport) {
      res.status(404).send("Airport not founded");
      return;
    }
    res.status(200).send("Airport correctly deleted");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
