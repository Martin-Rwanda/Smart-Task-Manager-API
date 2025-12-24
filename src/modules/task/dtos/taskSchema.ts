import Joi from "joi";
import { TaskStatus } from "../entinties";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    assignedTo: Joi.string().optional(),
}).options({ allowUnknown: false });

export const updateStatusSchema = Joi.object({
    status: Joi.string()
     .valid(...Object.values(TaskStatus))
     .required()
})