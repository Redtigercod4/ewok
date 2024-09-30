import { Server, Socket } from "socket.io";
import EquipmentService from "../../services/EquipmentService.js";
import SatEnvService from "../../services/SatenvService.js";
import { EquipmentEntity, Role, SatEnvEntity, UnitType } from "../../types";

export default function serverHandler(io: Server, socket: Socket) {
  const equipmentService = new EquipmentService();
  const satenvService = new SatEnvService();

  socket.on("JOIN", (server, team) => {
    socket.join(server);
    socket.join(`${server}_${team}`);
  });

  socket.on("LEAVE", (server, team) => {
    socket.leave(`${server}_${team}`);
    socket.leave(server);
  });

  socket.on("ACTIVATE", async (server: string) => {
    try {
      const hasSignalsBeenReset = await satenvService.resetSignalsByRole(
        server,
        Role.Instructor
      );

      if (!hasSignalsBeenReset) {
        throw new Error("Unable to reset Instructor Signals");
      }

      const equipment = await equipmentService.get(server, "Instructor");

      // Add error handling here

      for (const item of equipment) {
        const tmpSignal: EquipmentEntity = {
          ...item,
          active: true,
        };

        const tmpEnvSignal: Partial<SatEnvEntity> = {
          id: item.id,
          server: item.server,
          conn: item.conn,
          team: item.team,
          cf: Number(item.cf),
          dr: Number(item.dr),
          fec: Number(item.fec),
          mod: Number(item.mod),
          power: item.power,
          band: item.sat === "ASH" ? "C" : item.sat === "DRSC" ? "Ku" : "Ka",
          sat: item.sat,
          feed: item.feed,
          stage: "ULIF",
          active: true,
        };

        const hasBeenUpdated = await equipmentService.update(
          tmpSignal.id,
          tmpSignal
        );
        const hasBeenCreated = await satenvService.create(tmpEnvSignal);

        // Add some error handling here
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("DEACTIVATE", async (server: string) => {
    try {
      const hasSignalsBeenReset = await satenvService.resetSignalsByRole(
        server,
        Role.Instructor
      );

      if (!hasSignalsBeenReset) {
        throw new Error("Unable to reset Instructor Signals");
      }

      const equipment = await equipmentService.get(server, "Instructor");

      // Add error handling here

      for (const item of equipment) {
        const tmpSignal: EquipmentEntity = {
          ...item,
          active: true,
        };

        const hasBeenUpdated = await equipmentService.update(
          tmpSignal.id,
          tmpSignal
        );

        // Add error handling here
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("RESET", async (server: string) => {
    try {
      const studentSignalsReset = await satenvService.resetSignalsByRole(
        server,
        Role.Student
      );

      if (!studentSignalsReset) {
        throw new Error("Unable to reset Student Signals");
      }

      const resetTxData: Partial<EquipmentEntity> = {
        cf: 1000,
        dr: 1,
        mod: 1,
        fec: 1,
        power: -87,
        sat: "ASH",
        active: false,
      };

      const txReset = await equipmentService.resetEquipmentByType(
        server,
        UnitType.TX,
        resetTxData
      );

      if (!txReset) {
        throw new Error("Unable to reset TX Module");
      }

      const resetRxData: Partial<EquipmentEntity> = {
        cf: 1000,
        mod: 1,
        fec: 1,
      };

      const rxReset = await equipmentService.resetEquipmentByType(
        server,
        UnitType.RX,
        resetRxData
      );

      if (!rxReset) {
        throw new Error("Unable to reset RX Module");
      }

      const resetAntennaData: Partial<EquipmentEntity> = {
        unit_name: "C",
        cf: 0,
        bw: 0,
        mod: 0,
        fec: 0,
        power: 1,
        sat: "ASH",
        feed: "0",
        active: false,
      };

      const antennaReset = await equipmentService.resetEquipmentByType(
        server,
        UnitType.ANTENNA,
        resetAntennaData
      );

      if (!antennaReset) {
        throw new Error("Unable to reset Antenna Module");
      }

      io.emit("RESET_COMPLETE", {
        message: `Server ${server} has been reset successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("CHAT", (msg) => {
    io.emit("CHAT", "Chat is disabled");
  });
}
