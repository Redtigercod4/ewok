import { In, ObjectLiteral } from "typeorm";
import { db } from "../database/data-source.js";
import { SatEnv } from "../database/entity/satenv.entity.js";
import { Role } from "../types";

export default class SatEnvService {
  public async get(requestedServer: string): Promise<SatEnv[]> {
    return await db
      .getRepository<SatEnv>(SatEnv)
      .find({ where: { server: requestedServer } });
  }

  // Replace Any type with actual type
  public async create(data: any): Promise<ObjectLiteral[]> {
    const hasBeenCreated = await db
      .getRepository(SatEnv)
      .createQueryBuilder("sat_env")
      .insert()
      .values(data)
      .execute();

    return hasBeenCreated.identifiers;
  }

  // Replace Any type with actual type
  public async update(conn: string, data: any): Promise<number | undefined> {
    const hasUpdated = await db
      .getRepository(SatEnv)
      .createQueryBuilder("sat_env")
      .update(data)
      .where("sat_env.conn = :conn", { conn })
      .execute();

    return hasUpdated.affected;
  }

  public async delete(conn: string): Promise<number | null | undefined> {
    const hasDeleted = await db
      .getRepository(SatEnv)
      .createQueryBuilder("sat_env")
      .delete()
      .where("sat_env.conn = :conn", { conn })
      .execute();

    return hasDeleted.affected;
  }

  public async resetSignalsByRole(
    server: string,
    role: Role
  ): Promise<boolean> {
    const signals = await db
      .getRepository(SatEnv)
      .createQueryBuilder("sat_env")
      .where("sat_env.server = :server", { server })
      .andWhere("sat_env.team != :team", { team: role })
      .getMany();

    for (const signal of signals) {
      await this.delete(signal.conn);
    }

    return signals.length > 0;
  }
}
