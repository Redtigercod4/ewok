import { DataSource } from "typeorm";
import { Equipment } from "./entity/equipment.entity";
import { SatEnv } from "./entity/satenv.entity";
import { InitializeSchema } from "./migration/01-initalise-schema.migration";

const host: string = process.env.API_DATABASE_HOST || "";
const username: string = process.env.API_DATABASE_USERNAME || "";
const password: string = process.env.API_DATABASE_PASSWORD || "";
const database: string = process.env.API_DATABASE_NAME || "";

if (!host || !username || !password || !database) {
  throw new Error("Unable to load database credentials");
}

export const db = new DataSource({
  type: "postgres",
  host: host,
  port: 5432,
  username: username,
  password: password,
  database: database,
  logging: true,
  entities: [Equipment, SatEnv],
  migrations: [InitializeSchema],
});
