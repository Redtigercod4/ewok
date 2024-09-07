import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ length: 10 })
  declare conn: string;

  @Column({ length: 4 })
  declare server: string;

  @Column({ length: 20 })
  declare team: string;

  @Column({ length: 50 })
  declare unit_type: string;

  @Column({ length: 50 })
  declare unit_name: string;

  @Column("double")
  declare cf: number;

  @Column("double")
  declare bw: number;

  @Column("double")
  declare dr: number;

  @Column("int")
  declare mod: number;

  @Column("int")
  declare fec: number;

  @Column("double")
  declare power: number;

  @Column()
  declare sat: string;

  @Column()
  declare feed: string;

  @Column()
  declare active: boolean;
}
