import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SatEnv {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ length: 4 })
  declare conn: string;

  @Column({ length: 10 })
  declare server: string;

  @Column({length: 20 })
  declare team: string;

  @Column({type: "double precision", nullable: true})
  declare cf: number;

  @Column({type: "double precision", nullable: true})
  declare dr: number;

  @Column({type: "int", nullable: true})
  declare mod: number;

  @Column({type: "int", nullable: true})
  declare fec: number;

  @Column({type: "double precision", nullable: true})
  declare power: number;

  @Column({ length: 5 })
  declare band: string;

  @Column({ length: 10 })
  declare sat: string;

  @Column({ length: 45 })
  declare feed: string;

  @Column({ length: 4 })
  declare stage: string;

  @Column()
  declare lb: boolean;

  @Column()
  declare active: boolean;
}
