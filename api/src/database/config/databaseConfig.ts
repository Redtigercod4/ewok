import knex, { Knex } from "knex";
import { getEnvironment } from "../../utils/utils";
import { Environment } from "../../utils/types";

const host: string = process.env.API_DATABASE_HOST || "";
const username: string = process.env.API_DATABASE_USERNAME || "";
const password: string = process.env.API_DATABASE_PASSWORD || "";
const database: string = process.env.API_DATABASE_NAME || "";
const port: number =
  (process.env.API_DATABASE_PORT as unknown as number) || 5432;

if (!host || !username || !password || !database) {
  throw new Error("Unable to load database credentials");
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: host,
      user: username,
      password: password,
      database: database,
      port: port,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      host: host,
      user: username,
      password: password,
      database: database,
      port: port,
      pool: {
        min: 2,
        max: 10,
      },
    },
  },
};

const environmentConfig =
  getEnvironment() === Environment.Development
    ? config.development
    : config.production;

const db: Knex = knex(environmentConfig);

export { db };
