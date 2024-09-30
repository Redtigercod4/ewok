import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { __dirname } from "../utils/index.js";
import { Equipment } from "./entity/equipment.entity.js";
import { SatEnv } from "./entity/satenv.entity.js";
import { InitializeSchema1727553773655 } from "./migration/1727553773655-InitializeSchema.js";

dotenv.configDotenv();

const host: string = process.env.API_DATABASE_HOST || "";
const username: string = process.env.API_DATABASE_USERNAME || "";
const password: string = process.env.API_DATABASE_PASSWORD || "";
const database: string = process.env.API_DATABASE_NAME || "";

if (!host || !username || !password || !database) {
  throw new Error("Unable to load database credentials");
}

const databaseUrl = `postgres://${username}:${password}@${host}:5432/${database}`;

export const db = new DataSource({
  type: "postgres",
  url: databaseUrl,
  logging: true,
  entities: [Equipment, SatEnv],
  migrations: [InitializeSchema1727553773655],
});
