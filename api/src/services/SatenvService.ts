import { ObjectLiteral } from "typeorm";
import { db } from "../database/data-source";
import { SatEnv } from "../database/entity/satenv.entity";

export default class SatEnvService {
  public async get(server: string): Promise<SatEnv[]> {
    return await db
      .getRepository(SatEnv)
      .createQueryBuilder("satenv")
      .where("satenv.server = :server", { server })
      .getMany();
  }

  // Replace Any type with actual type
  public async create(data: any): Promise<ObjectLiteral[]> {
    const hasBeenCreated = await db
      .getRepository(SatEnv)
      .createQueryBuilder("satenv")
      .insert()
      .values(data)
      .execute();

    return hasBeenCreated.identifiers;
  }

  // Replace Any type with actual type
  public async update(conn: string, data: any): Promise<number | undefined> {
    const hasUpdated = await db
      .getRepository(SatEnv)
      .createQueryBuilder("satenv")
      .update(data)
      .where("satenv.conn = :conn", { conn })
      .execute();

    return hasUpdated.affected;
  }

  public async delete(conn: string): Promise<number | null | undefined> {
    const hasDeleted = await db
      .getRepository(SatEnv)
      .createQueryBuilder("satenv")
      .delete()
      .where("satenv.conn = :conn", { conn })
      .execute();

    return hasDeleted.affected;
  }
}
