import express, { Router } from "express";
import EquipmentController from "../controllers/EquipmentController.js";

const router: Router = express.Router();
const equipmentController = new EquipmentController();

router
  .route("/")
  .get(equipmentController.getEquipment);

export default router;
