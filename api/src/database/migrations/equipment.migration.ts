import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("equipment", (table) => {
    table.increments("id");
    table.string("conn", 10);
    table.string("server", 4);
    table.string("team", 20);
    table.string("unit_type", 50);
    table.string("unit_name", 50);
    table.double("cf");
    table.double("bw");
    table.double("dr");
    table.integer("mod");
    table.integer("fec");
    table.double("power");
    table.string("sat");
    table.string("feed");
    table.boolean("active");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("equipment");
}
