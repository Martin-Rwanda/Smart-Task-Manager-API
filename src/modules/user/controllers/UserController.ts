import { Request, Response, NextFunction } from "express";
import { UserService } from "../services";
import { succcessResponse } from "../../../core/http";

export class UserController {
    constructor(private service = new UserService()) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, role, isActive } = req.body;

            const user = await this.service.create({
                email,
                password,
                role,
                isActive
            });

            return succcessResponse(res, user, 201);
        } catch (err) {
            next(err);
        }
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.service.getAll();
            return succcessResponse(res, users);
        } catch (err) {
            next(err);
        }
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.service.getById(id);
            return succcessResponse(res, user);
        } catch (err) {
            next(err);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await this.service.update(id, updates);
            return succcessResponse(res, updatedUser);
        } catch (err) {
            next(err);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.service.delete(id);
            return succcessResponse(res, { message: "User deleted successfully" }, 200);
        } catch (err) {
            next(err);
        }
    };

    updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const updatedUser = await this.service.updateRole(id, role);
            return succcessResponse(res, updatedUser);
        } catch (error) {
            next(error);
        }
    }
}