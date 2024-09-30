import { ObjectLiteral } from "typeorm";
import { db } from "../database/data-source.js";
import { Equipment } from "../database/entity/equipment.entity.js";
import { UnitType } from "../types";

export default class EquipmentService {
  public async get(server: string, team: string): Promise<Equipment[]> {
    return await db
      .getRepository(Equipment)
      .createQueryBuilder("equipment")
      .where("equipment.server = :server", { server })
      .andWhere("equipment.team = :team", { team })
      .getMany();
  }

  public async getAll(): Promise<Equipment[]> {
    return await db
    .getRepository(Equipment)
    .createQueryBuilder("equipment")
    .getMany();
  }

  // Replace Any type with actual type
  public async create(data: any): Promise<ObjectLiteral[]> {
    const hasBeenCreated = await db
      .getRepository(Equipment)
      .createQueryBuilder("equipment")
      .insert()
      .values(data)
      .execute();

    return hasBeenCreated.identifiers;
  }

  // Replace Any type with actual type
  public async update(id: number, data: any): Promise<number | undefined> {
    const hasUpdated = await db
      .getRepository(Equipment)
      .createQueryBuilder("equipment")
      .update(data)
      .where("equipment.id = :id", { id })
      .execute();

    return hasUpdated.affected;
  }

  public async delete(id: number): Promise<number | null | undefined> {
    const hasDeleted = await db
      .getRepository(Equipment)
      .createQueryBuilder("equipment")
      .delete()
      .where("equipment.id = :id", { id })
      .execute();

    return hasDeleted.affected;
  }

  public async resetEquipmentByType(server: string, unitType: UnitType, resetData: any): Promise<boolean> {
    const equipment = await db.getRepository(Equipment)
      .createQueryBuilder("equipment")
      .where("equipment.server = :server", { server })
      .andWhere("equipment.team != :team", { team: "Instructor" })
      .andWhere("equipment.unit_type = :unitType", { unitType })
      .getMany();

    if (!equipment.length) {
      return false;
    }

    for (const item of equipment) {
      const updatedItem = { ...item, ...resetData };
      await this.update(item.id, updatedItem);
    }

    return true;
  }
}
