import mongoose from "npm:mongoose@8.5.1";
import express from "npm:express@4.19.2";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { addAirport } from "./resolvers/addAirport.ts";
import { deleteAirport } from "./resolvers/deleteAirport.ts";
import { getAirport } from "./resolvers/getAirport.ts";
import { getAllAirports } from "./resolvers/getAiports.ts";

const env = await load();
const MONGO_URL = Deno.env.get("MONGO_URL") || env.MONGO_URL;

if (!MONGO_URL) {
  console.log("No mongo URL found");
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());

app
  .post("/addAirport", addAirport)
  .delete("/deleteAirport/:id", deleteAirport)
  .get("/Airport/:id", getAirport)
  .get("/Airports", getAllAirports);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
