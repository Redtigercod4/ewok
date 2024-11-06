import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController.js";
import EquipmentService from "../services/EquipmentService.js";

export default class EquipmentController extends ErrorController {
  public async getEquipment(
    req: Request<{ server: string; team: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const equipmentService = new EquipmentService();
      const { server, team } = req.query;

      if (!server || !team) {
        throw ErrorController.InternalServerError("Unable to find server or team");
      }

      const retrievedEquipment = await equipmentService.get(
        server as unknown as string,
        team as unknown as string
      );

      res.send(retrievedEquipment).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
