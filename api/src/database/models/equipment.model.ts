import type { Knex } from "knex";

declare module "knex/types/tables" {
  interface Equipment {
    id: number;
    conn: string;
    server: string;
    team: string;
    unit_type: string;
    unit_name: string;
    cf: number;
    bw: number;
    dr: number;
    mod: number;
    fec: number;
    power: number;
    sat: string;
    feed: string;
    active: boolean;
  }

  interface Tables {
    equipment: Knex.CompositeTableType<Equipment>;
  }
}
