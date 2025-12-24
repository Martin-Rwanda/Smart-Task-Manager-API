import { Router } from "express";
import { UserController } from "../controllers";
import { authMiddleware, requirePermission } from "../../auth/middlewares";
import { Permission } from "../../auth/types";
import { validate } from "../../../core/validation";
import { createUserSchema, idParamSchema, updateUserSchema } from "../dtos";
import { asyncHandler } from "../../../core/http";

const controller = new UserController();
const userRoutes = Router();

userRoutes.post(
  "/",
  authMiddleware,
  requirePermission(Permission.USER_CREATE),
  validate(createUserSchema),
  asyncHandler(controller.createUser.bind(controller))
);

userRoutes.get(
  "/",
  authMiddleware,
  requirePermission(Permission.USER_VIEW),
  asyncHandler(controller.getAllUsers.bind(controller))
);

userRoutes.get(
  "/:id",
  authMiddleware,
  requirePermission(Permission.USER_VIEW),
  validate(idParamSchema, "params"),
  asyncHandler(controller.getUserById.bind(controller))
);

userRoutes.patch(
  "/:id",
  authMiddleware,
  requirePermission(Permission.USER_UPDATE),
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  asyncHandler(controller.updateUser.bind(controller))
);

userRoutes.delete(
  "/:id",
  authMiddleware,
  requirePermission(Permission.USER_DELETE),
  validate(idParamSchema, "params"),
  asyncHandler(controller.deleteUser.bind(controller))
);

userRoutes.patch(
  "/:id/role",
  authMiddleware,
  requirePermission(Permission.USER_UPDATE_ROLE),
  validate(idParamSchema, "params"),
  asyncHandler(controller.updateUserRole.bind(controller))
);

export { userRoutes };
