import express, { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController";

const router: Router = express.Router();
const authController = new AuthController();

router.route("/login").post(authController.signIn);

router.route("/logout");

router.route("/register");

router.route("/forgotPassword");

export default router;
