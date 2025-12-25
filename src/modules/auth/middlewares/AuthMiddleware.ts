import { Request, Response, NextFunction } from "express";
import { AppJwtPayload, JwtService, logoutService } from "../services";
import { AppError } from "../../../core/errors";
import { Role } from "../types";

export interface AuthRequest extends Request {
    user?: {
        userId: string,
        role: Role
    }
}


export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    if (!header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization header"
        });
    }


    const token = header.split(" ")[1];

    if (await logoutService.isBlacklisted(token)) {
        return res.status(401).json({
            success: false,
            message: "Token revoked",
        });
    }

    try {
        const payload: AppJwtPayload = JwtService.verify(token);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}