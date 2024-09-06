import type { Knex } from "knex";

declare module "knex/types/tables" {
  interface SatEnv {
    id: number;
    conn: string;
    server: string;
    team: string;
    cf: number;
    dr: number;
    mod: number;
    fec: number;
    power: number;
    band: string;
    sat: string;
    feed: string;
    stage: string;
    lb: boolean;
    active: boolean;
  }

  interface Tables {
    satenv: Knex.CompositeTableType<SatEnv>;
  }
}
