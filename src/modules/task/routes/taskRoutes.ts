import { Router } from "express";
import { validate } from "../../../core/validation";
import { createTaskSchema, updateStatusSchema } from "../dtos";
import { asyncHandler } from "../../../core/http";
import { TaskController } from "../controllers";

const controller = new TaskController()

const taskRoutes = Router();

taskRoutes.post('/', validate(createTaskSchema), asyncHandler(controller.createTask));
taskRoutes.get('/', asyncHandler(controller.getAllTask));
taskRoutes.patch('/:id/status', validate(updateStatusSchema), asyncHandler(controller.updateTaskStatus));

export {taskRoutes};
