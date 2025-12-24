import { Request, Response } from "express";
import { succcessResponse } from "../../../core/http";
import { AuthService, LogoutService } from "../services/AuthService";

class AuthController {
    private service = new AuthService();

    login = async (req:Request, res:Response) => {
        const {email, password} = req.body;

        const result = await this.service.login(email, password);

        return succcessResponse(res, result, 200);
    }

    logout = (req: Request, res: Response) => {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = header.split(" ")[1];
        LogoutService.addTokenToBlacklist(token);

        return res.json({ success: true, message: "Logged out successfully" });
    };
}

export const authController = new AuthController();