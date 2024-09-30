import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController.js";
import EquipmentService from "../services/EquipmentService.js";

export default class ServerController extends ErrorController {
  // This is the unknown function, needs further investigation
  public async getServer(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await new EquipmentService().getAll();

      console.log(equipment);

      const servers = equipment.map((x) => x.server);

      res
        .send([...new Set(servers)])
        .status(200)
        .end();
    } catch (error) {
      console.log(error);
    }
  }
}
