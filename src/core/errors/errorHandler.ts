import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { logger } from "../logging";

export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof AppError) {
        return res.status(error.statusCode || 400).json({
            success: false,
            message: error.message
        })
    }

    if (error instanceof Error) {
        logger.error(error, "Unhandled error");
    } else {
        logger.error({ error }, "Unknown error");
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}