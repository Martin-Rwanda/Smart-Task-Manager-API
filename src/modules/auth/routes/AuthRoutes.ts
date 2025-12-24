import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares";

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);

export {authRouter};