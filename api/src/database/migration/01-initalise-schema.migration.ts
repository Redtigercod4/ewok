import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitializeSchema implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "equipment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "conn",
            type: "varchar",
            length: "10",
          },
          {
            name: "server",
            type: "varchar",
            length: "4",
          },
          {
            name: "team",
            type: "varchar",
            length: "20",
          },
          {
            name: "unit_type",
            type: "varchar",
            length: "50",
          },
          {
            name: "unit_name",
            type: "varchar",
            length: "50",
          },
          {
            name: "cf",
            type: "double",
          },
          {
            name: "bw",
            type: "double",
          },
          {
            name: "dr",
            type: "double",
          },
          {
            name: "mod",
            type: "int",
          },
          {
            name: "fec",
            type: "int",
          },
          {
            name: "power",
            type: "double",
          },
          {
            name: "sat",
            type: "varchar",
          },
          {
            name: "feed",
            type: "varchar",
          },
          {
            name: "active",
            type: "boolean",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "satenv",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "conn",
            type: "varchar",
            length: "10",
          },
          {
            name: "server",
            type: "varchar",
            length: "4",
          },
          {
            name: "team",
            type: "varchar",
            length: "20",
          },
          {
            name: "cf",
            type: "double",
          },
          {
            name: "dr",
            type: "double",
          },
          {
            name: "mod",
            type: "int",
          },
          {
            name: "fec",
            type: "int",
          },
          {
            name: "power",
            type: "double",
          },
          {
            name: "band",
            type: "varchar",
            length: "5",
          },
          {
            name: "sat",
            type: "varchar",
            length: "10",
          },
          {
            name: "feed",
            type: "varchar",
            length: "45",
          },
          {
            name: "stage",
            type: "varchar",
            length: "4",
          },
          {
            name: "lb",
            type: "boolean",
          },
          {
            name: "active",
            type: "boolean",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("equipment");
    await queryRunner.dropTable("satenv");
  }
}
