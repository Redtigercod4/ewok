import express, { Router } from "express";
import SatenvController from "../controllers/SatenvController.js";

const router: Router = express.Router();
const satEnvController = new SatenvController();

router.route("/").get((req, res, next) => {
    // @ts-ignore
    satEnvController.getSatEnv(req, res, next)
});

export default router;
