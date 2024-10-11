import { NextFunction, Request, Response } from "express";
import ErrorController from "./ErrorController";

export default class AuthController extends ErrorController {

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const userLoginData = req.body;

        } catch (error) {
            next(error)
        }
    }

    public async signOut(req: Request, res: Response, next: NextFunction) {}

    public async register(req: Request, res: Response, next: NextFunction) {}

    public async forgotPassword(req: Request, res: Response, next: NextFunction) {}
}