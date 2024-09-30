import { Equipment } from "../database/entity/equipment.entity";
import { SatEnv } from "../database/entity/satenv.entity";

export const enum TableType {
    Equipment = "equipment",
    Satenv = "satEnv"
}

export const enum UnitType {
    TX = "TX",
    RX = "RX",
    ANTENNA = "Antenna"
}

export const enum Role {
    Instructor = "Instructor",
    Student = "Student"
}

export type EquipmentEntity = {
    id: number;
    conn: string;
    server: string;
    team: string;
    unit_type: string;
    unit_name: string;
    cf: number;
    bw: number;
    dr?: number;
    mod: number;
    fec: number;
    power: number;
    sat: string;
    feed: string;
    active: boolean;
}

export type SatEnvEntity = {
    id: number;
    conn: string;
    server: string;
    team: string;
    cf: number;
    dr: number;
    mod: number;
    fec: number;
    power: number;
    band: string;
    sat: string;
    feed: string;
    stage: string;
    lb: boolean;
    active: boolean;
}