import mongoose from "npm:mongoose@8.5.1";
import { Airport } from "../types.ts";

const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, requires: true },
  country: { type: String, required: true },
}, { timestamps: true });

export type AirportModelType =
  & mongoose.Document
  & Omit<Airport, "id">;

export const AirportModel = mongoose.model<AirportModelType>(
  "Airport",
  airportSchema,
);
