import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController";
import SatEnvService from "../services/SatenvService";

export default class SatenvController extends ErrorController {
  private readonly satenvService = new SatEnvService();

  public async getSatEnv(
    req: Request<{ server: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { server } = req.query;

      if (!server) {
        throw ErrorController.InternalServerError();
      }

      const retrivedSatEnv = await this.satenvService.get(server.toString());

      res.send(retrivedSatEnv).status(200).end();
    } catch (error) {
      next(error);
    }
  }

  public async resetSatEnv(
    req: Request<{ server: string; conn: string; room: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { server, conn, room } = req.query;

      if (!server || !conn || !room) {
        throw ErrorController.InternalServerError();
      }

      const hasDeleted = this.satenvService.delete(conn.toString());

      const satEnvData = this.satenvService.get(server.toString());

      req.io?.to(room.toString()).emit("satEnv_reset", satEnvData);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
