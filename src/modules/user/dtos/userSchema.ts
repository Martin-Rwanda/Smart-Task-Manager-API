import Joi from "joi";
import { Role } from "../../auth/types";

export const createUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
}).options({ allowUnknown: false });

export const updateUserSchema = Joi.object({
    email: Joi.string().required(),
})


export const updateRoleSchema = Joi.object({
    role: Joi.string()
     .valid(...Object.values(Role))
     .required()
})