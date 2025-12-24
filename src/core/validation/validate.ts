import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export const validate = (
    schema: Joi.ObjectSchema,
    property: 'body' | 'params' |'query'= 'body'
) => {
    return (req:Request, res: Response, next:NextFunction) => {
        const { error } = schema.validate(req[property], {abortEarly: false});

        if (error) {
            return next(
                new AppError(
                    error.details.map(d => d.message).join(', '),
                    400
                )
            )
        }
        next();
    }
}