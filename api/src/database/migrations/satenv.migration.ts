import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("satenv", (table) => {
    table.increments("id");
    table.string("server", 4);
    table.string("conn", 10);
    table.string("team", 20);
    table.double("cf");
    table.double("dr");
    table.integer("mod");
    table.integer("fec");
    table.double("power");
    table.string("band", 5);
    table.string("sat", 10);
    table.string("feed", 45);
    table.string("stage", 4);
    table.boolean("lb");
    table.boolean("active");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("satenv");
}
