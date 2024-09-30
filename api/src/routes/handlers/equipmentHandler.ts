import { Server, Socket } from "socket.io";
import { TableType } from "../../types";
import EquipmentService from "../../services/EquipmentService.js";

export default function equipmentHandler(io: Server, socket: Socket) {
    const equipmentService = new EquipmentService();

    socket.on('POST', async (table: TableType, update: any) => {
        if (table === TableType.Equipment) {
            try {
                const room = `${update.server}_${update.team}`;
                delete update.id;

                const hasBeenCreated = await equipmentService.create(update);

                // Need to add error handling

                const data = await equipmentService.get(update.server, update.team);

                io.to(room).emit("equipment_post", data);
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('PATCH', async (table: TableType, update: any) => {
        if (table === TableType.Equipment) {
            try {
                const room = `${update.server}_${update.team}`;

                const id = update.id;
                delete update.id;

                const hasBeenUpdated = await equipmentService.update(id, update);

                if (!hasBeenUpdated || hasBeenUpdated <= 0) {
                    throw new Error("Record has not been updated")
                }

                const data = await equipmentService.get(update.server, update.team);

                io.to(room).emit("equipment_patch", data);
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('DELETE', async (table: TableType, update: any) => {
        if (table === TableType.Equipment) {
            try {
                const id = update.id;
                const room = update.server;
                delete update.id;

                const hasBeenDeleted = await equipmentService.delete(id);

                if (!hasBeenDeleted || hasBeenDeleted <= 0) {
                    throw new Error("Record has not been deleted")
                }

                const data = await equipmentService.get(update.server, update.team)

                io.to(room).emit("equipment_delete", data);
            } catch (error) {
                console.log(error)
            }
        }
    })
}