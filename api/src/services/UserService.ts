import { ObjectLiteral } from "typeorm";
import { db } from "../database/data-source";
import { User } from "../database/entity/user.entity";
import { UserEntity } from "../types";

export default class UserService {
  public async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await db
      .getRepository(User)
      .createQueryBuilder("users")
      .where("users.username = :username", { username })
      .getOne();
  }

  public async getUserByUniqueId(
    uniqueUserId: string
  ): Promise<UserEntity | null> {
    return await db
      .getRepository(User)
      .createQueryBuilder("users")
      .where("users.uniqueUserId = :uniqueUserId", { uniqueUserId })
      .getOne();
  }

  public async createUser(
    data: Omit<UserEntity, "id">
  ): Promise<ObjectLiteral[]> {
    const hasBeenCreated = await db
      .getRepository(User)
      .createQueryBuilder("users")
      .insert()
      .values(data)
      .execute();

    return hasBeenCreated.identifiers;
  }

  public async updateUser(
    data: Omit<UserEntity, "id">,
    uniqueUserId: string
  ): Promise<number | undefined> {
    const isUpdated = await db
      .getRepository(User)
      .createQueryBuilder("users")
      .update(data)
      .where("users.uniqueUserId = :uniqueUserId", { uniqueUserId })
      .execute();

    return isUpdated.affected;
  }

  public async deleteUser(
    uniqueUserId: string
  ): Promise<number | null | undefined> {
    const isDeleted = await db
      .getRepository(User)
      .createQueryBuilder("users")
      .delete()
      .where("users.uniqueUserId = :uniqueUserId", { uniqueUserId })
      .execute();

    return isDeleted.affected;
  }
}
