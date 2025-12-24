import { Response, NextFunction } from "express";
import { AuthRequest } from "./AuthMiddleware";
import { RolePermission, Permission } from "../types";
import { AppError } from "../../../core/errors";

export const requirePermission = (permission: Permission) => {
    return (req: AuthRequest, res:Response, next:NextFunction) => {
        const user = req.user;

        if(!user) {
            return next(new AppError('Unauthenticated', 401))
        }

        const permissions = RolePermission[user.role];

        if (!permissions.includes(permission)) {
            return next(new AppError('Forbidden', 403))
        }
        next()
    }
}