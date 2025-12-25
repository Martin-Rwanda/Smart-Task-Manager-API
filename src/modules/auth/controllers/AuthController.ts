import { Request, Response } from "express";
import { succcessResponse } from "../../../core/http";
import { AuthService, logoutService } from "../services";

class AuthController {
    private service = new AuthService();

    login = async (req:Request, res:Response) => {
        const {email, password} = req.body;

        const result = await this.service.login(email, password);

        return succcessResponse(res, result, 200);
    }

    logout = async (req: Request, res: Response) => {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = header.split(" ")[1];

        try {
            await logoutService.logout(token);
            return res.json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Could not log out",
            });
        }
    };
}

export const authController = new AuthController();