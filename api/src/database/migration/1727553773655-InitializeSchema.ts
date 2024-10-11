import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitializeSchema1727553773655 implements MigrationInterface {
  name = "InitializeSchema1727553773655";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "uniqueUserId",
            type: "uuid",
          },
          {
            name: "username",
            type: "varchar",
            length: "10"
          },
          {
            name: "password",
            type: "varchar",
            length: "256"
          },
          {
            name: "email",
            type: "varchar",
            length: "128"
          },
          {
            name: "isActive",
            type: "boolean"
          }
        ]
      })
    )
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
            type: "double precision",
            isNullable: true
          },
          {
            name: "bw",
            type: "double precision",
            isNullable: true
          },
          {
            name: "dr",
            type: "double precision",
            isNullable: true
          },
          {
            name: "mod",
            type: "int",
            isNullable: true
          },
          {
            name: "fec",
            type: "int",
            isNullable: true
          },
          {
            name: "power",
            type: "double precision",
            isNullable: true
          },
          {
            name: "sat",
            type: "varchar"
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
            type: "double precision",
            isNullable: true
          },
          {
            name: "dr",
            type: "double precision",
            isNullable: true
          },
          {
            name: "mod",
            type: "int",
            isNullable: true
          },
          {
            name: "fec",
            type: "int",
            isNullable: true
          },
          {
            name: "power",
            type: "double precision",
            isNullable: true
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("equipment");
    await queryRunner.dropTable("satenv");
  }
}
