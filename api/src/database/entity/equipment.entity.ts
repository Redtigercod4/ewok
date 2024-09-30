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

  @Column({type: "double precision", nullable: true})
  declare cf: number;

  @Column({type: "double precision", nullable: true})
  declare bw: number;

  @Column({ type: "double precision", nullable: true })
  declare dr: number;

  @Column({type: "int", nullable: true})
  declare mod: number;

  @Column({type: "int", nullable: true})
  declare fec: number;

  @Column({type: "double precision", nullable: true})
  declare power: number;

  @Column()
  declare sat: string;

  @Column()
  declare feed: string;

  @Column()
  declare active: boolean;
}
