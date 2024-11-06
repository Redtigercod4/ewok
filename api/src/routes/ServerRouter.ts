import express, { Router } from "express";
import ServerController from "../controllers/ServerController.js";

const router: Router = express.Router();
const serverController = new ServerController();

router
  .route("/")
  .get((req, res, next) => serverController.getServer(req, res, next));

export default router;
