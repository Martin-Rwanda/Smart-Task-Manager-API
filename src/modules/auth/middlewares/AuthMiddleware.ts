import { Request, Response, NextFunction } from "express";
import { JwtPayload, JwtService, LogoutService } from "../services";
import { AppError } from "../../../core/errors";
import { Role } from "../types";

export interface AuthRequest extends Request {
    user?: {
        userId: string,
        role: Role
    }
}


export const authMiddleware = (
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

    if (LogoutService.isBlacklisted(token)) {
        return res.status(401).json({ success: false, message: "Token is revoked" });
    }

    try {
        const payload: JwtPayload = JwtService.verify(token);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}