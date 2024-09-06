import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("equipment").del();

  await knex("equipment").insert([
    {
      id: 1,
      conn: "Ethernet",
      server: "Server-1",
      team: "Team-A",
      unit_type: "Router",
      unit_name: "Unit-123",
      cf: 5.0,
      bw: 100.0,
      dr: 250.0,
      mod: 1.0,
      fec: 0.9,
      power: 120.0,
      sat: "Sat-9",
      feed: "Feed-22",
      active: true,
    },
    {
      id: 2,
      conn: "Wi-Fi",
      server: "Server-2",
      team: "Team-B",
      unit_type: "Switch",
      unit_name: "Unit-124",
      cf: 5.1,
      bw: 150.0,
      dr: 300.0,
      mod: 1.2,
      fec: 0.8,
      power: 110.0,
      sat: "Sat-10",
      feed: "Feed-23",
      active: false,
    },
  ]);
}
