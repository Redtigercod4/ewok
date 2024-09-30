import { Server, Socket } from "socket.io";
import equipmentHandler from "./handlers/equipmentHandler.js";
import satenvHandler from "./handlers/satenvHandler.js";
import serverHandler from "./handlers/serverHandler.js";

export default function socketRouter(io: Server, socket: Socket) {
    equipmentHandler(io, socket)
    satenvHandler(io, socket);
    serverHandler(io, socket);
}