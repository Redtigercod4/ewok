import express, { Router } from "express";
import ServerController from "../controllers/ServerController.js";

const router: Router = express.Router();
const serverController = new ServerController();

router.route("/").get(serverController.getServer);

export default router;