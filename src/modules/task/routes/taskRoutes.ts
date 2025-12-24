import { Router } from "express";
import { validate } from "../../../core/validation";
import { createTaskSchema, updateStatusSchema, idParamSchema } from "../dtos";
import { asyncHandler } from "../../../core/http";
import { TaskController } from "../controllers";
import { authMiddleware, requirePermission } from "../../auth/middlewares";
import { Permission } from "../../auth/types";

const controller = new TaskController()

const taskRoutes = Router();

taskRoutes.post('/',authMiddleware, requirePermission(Permission.TASK_CREATE), validate(createTaskSchema), asyncHandler(controller.createTask).bind(controller));
taskRoutes.get('/',authMiddleware, requirePermission(Permission.TASK_VIEW), asyncHandler(controller.getAllTask));
taskRoutes.patch('/:id/status',authMiddleware, requirePermission(Permission.TASK_UPDATE), validate(idParamSchema, "params"), validate(updateStatusSchema), asyncHandler(controller.updateTaskStatus));
taskRoutes.delete('/:id',authMiddleware, requirePermission(Permission.TASK_DELETE), validate(idParamSchema, "params"), asyncHandler(controller.deleteTask))

export {taskRoutes};
