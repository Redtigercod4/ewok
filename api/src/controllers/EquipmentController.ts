import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController";
import EquipmentService from "../services/EquipmentService";

export default class EquipmentController extends ErrorController {
  private readonly equipmentService = new EquipmentService();

  public async getEquipment(
    req: Request<{ server: string; team: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { server, team } = req.query;

      if (!server || !team) {
        throw ErrorController.InternalServerError();
      }

      const retrievedEquipment = await this.equipmentService.get(
        server.toString(),
        team.toString()
      );

      res.send(retrievedEquipment).status(200).end();
    } catch (error) {
      next(error);
    }
  }

  public async createEquipment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Replace Any type with actual type
      const data = req.body;

      const room = `${data.server}_${data.team}`;

      if (!data) {
        throw ErrorController.InternalServerError();
      }

      const hasBeenCreated = await this.equipmentService.create(data);

      if (hasBeenCreated.length <= 0) {
        throw ErrorController.InternalServerError();
      }

      const currentEquipment = await this.equipmentService.get(
        data.server,
        data.team
      );

      req.io?.to(room).emit("equipment_post", currentEquipment);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  public async updateEquipment(
    req: Request<{ id: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.query;
      // Replace Any type with actual type
      const data = req.body;

      const room = `${data.server}_${data.team}`;

      if (!id || !data) {
        throw ErrorController.InternalServerError();
      }

      const hasEquipmentUpdated = await this.equipmentService.update(
        parseInt(id.toString()),
        data
      );

      if (hasEquipmentUpdated === undefined) {
        throw ErrorController.InternalServerError();
      }

      if (hasEquipmentUpdated <= 0) {
        throw ErrorController.InternalServerError();
      }

      const currentEquipment = this.equipmentService.get(
        data.server,
        data.team
      );

      req.io?.to(room).emit("equipment_patch", currentEquipment);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  public async deleteEquipment(
    req: Request<{ id: string; server: string; team: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, server, team } = req.query;

      if (!id || !server || !team) {
        throw ErrorController.InternalServerError();
      }

      const hasDeleted = await this.equipmentService.delete(
        parseInt(id.toString())
      );

      if (!hasDeleted) {
        throw ErrorController.InternalServerError();
      }

      if (hasDeleted <= 0) {
        throw ErrorController.InternalServerError();
      }

      const currentEquipment = this.equipmentService.get(
        server.toString(),
        team.toString()
      );

      req.io?.to(server.toString()).emit("equipment_delete", currentEquipment);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
