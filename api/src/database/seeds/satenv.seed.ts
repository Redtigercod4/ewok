import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("satenv").del();

  await knex("satenv").insert([
    {
      id: 1,
      conn: "Ethernet",
      server: "Server-1",
      team: "Team-A",
      cf: 4.5,
      dr: 200.0,
      mod: 1.0,
      fec: 0.75,
      power: 120.0,
      band: "Ku",
      sat: "Sat-12",
      feed: "Feed-01",
      stage: "Production",
      lb: true,
      active: true,
    },
    {
      id: 2,
      conn: "Wi-Fi",
      server: "Server-2",
      team: "Team-B",
      cf: 5.0,
      dr: 250.0,
      mod: 1.1,
      fec: 0.8,
      power: 110.0,
      band: "Ka",
      sat: "Sat-15",
      feed: "Feed-02",
      stage: "Development",
      lb: false,
      active: true,
    },
  ]);
}
