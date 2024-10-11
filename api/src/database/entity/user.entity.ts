import { UUID } from "crypto";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column()
    @Generated("uuid")
    declare uniqueUserId: UUID;

    @Column({ length: 10 })
    declare username: string;

    @Column({ length: 256 })
    declare password: string;

    @Column({ length: 128 })
    declare email: string;

    @Column({ type: "boolean" })
    declare isActive: boolean;
}