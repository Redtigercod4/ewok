import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController.js";
import SatEnvService from "../services/SatenvService.js";

export default class SatenvController extends ErrorController {
  public async getSatEnv(
    req: Request<{ server: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const satenvService = new SatEnvService();
      const { server } = req.query;

      if (!server) {
        throw ErrorController.InternalServerError();
      }

      const retrivedSatEnv = await satenvService.get(server.toString());

      res.send(retrivedSatEnv).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
