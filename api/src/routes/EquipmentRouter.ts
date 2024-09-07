import express, { Router } from "express";
import EquipmentController from "../controllers/EquipmentController";

const router: Router = express.Router();
const equipmentController = new EquipmentController();

router
  .route("/")
  .get(equipmentController.getEquipment)
  .post(equipmentController.createEquipment)
  .patch(equipmentController.updateEquipment)
  .delete(equipmentController.deleteEquipment);

export default router;
