import { Server, Socket } from "socket.io";
import SatEnvService from "../../services/SatenvService.js";
import { TableType } from "../../types";

export default function satenvHandler(io: Server, socket: Socket) {
    const satenvService = new SatEnvService();

    socket.on('POST', async (table: TableType, update: any) => {
        if (table === TableType.Satenv) {
            try {
                const room = update.server;
                delete update.id;

                const hasBeenCreated = await satenvService.create(update);

                // Need to add error handling

                const data = await satenvService.get(update.server);

                io.to(room).emit("satenv_post", data);
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('PATCH', async (table: TableType, update: any) => {
        if (table === TableType.Satenv) {
            try {
                const conn = update.conn;
                const room = update.server;
                delete update.id;

                const hasBeenUpdated = await satenvService.update(conn, update);

                if (!hasBeenUpdated || hasBeenUpdated <= 0) {
                    throw new Error("Record has not been updated")
                }

                const data = await satenvService.get(update.server);

                io.to(room).emit("satenv_patch", data)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('DELETE', async (table: TableType, update: any) => {
        if (table === TableType.Satenv) {
            try {
                const conn = update.conn;
                const room = update.server;

                const hasBeenDeleted = await satenvService.delete(conn);

                if (!hasBeenDeleted || hasBeenDeleted <= 0) {
                    throw new Error("Record has not been deleted")
                }

                const data = await satenvService.get(update.server);

                io.to(room).emit("satenv_delete", data)
            } catch (error) {
                console.log(error)
            }
        }
    })
}