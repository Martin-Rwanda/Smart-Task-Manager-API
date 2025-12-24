import { Response } from "express";

export const succcessResponse = <T> (
    res:Response,
    data: T,
    status = 200
) => {
    return res.status(status).json({
        success: true,
        data,
    })
}