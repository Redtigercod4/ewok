import { ObjectLiteral } from "typeorm";
import { db } from "../database/data-source";
import { Equipment } from "../database/entity/equipment.entity";

export default class EquipmentService {
  public async get(server: string, team: string): Promise<Equipment[]> {
    return await db
      .getRepository(Equipment)
      .createQueryBuilder("equipment")
      .where("equipment.server = :server", { server })
      .andWhere("equipment.team = :team", { team })
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
}
