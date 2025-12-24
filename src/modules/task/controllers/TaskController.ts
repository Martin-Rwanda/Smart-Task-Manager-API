import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services";
import { TaskStatus } from "../entinties";
import { succcessResponse } from "../../../core/http";

export class TaskController {
    constructor(private service = new TaskService()) {};

    createTask = async (req:Request, res:Response, next:NextFunction) => {
        const {title, description, assignedTo } = req.body;

        const task = await this.service.create({
            title,
            description,
            assignedTo
        });
        return succcessResponse(res, task, 201)
    }

    getAllTask = async (req:Request, res:Response) => {
        const tasks = await this.service.getAll();

        return succcessResponse(res, tasks, 201)
    }

    updateTaskStatus = async (req:Request, res:Response, next:NextFunction) => {
        const {id} = req.params;
        const {status} = req.body;

        const task = await this.service.updateTaskStatus(
            id,
            status as TaskStatus
        )

        return succcessResponse(res, task, 201)
    }

    deleteTask = async (req:Request, res:Response) => {
        const {id} = req.params;

        const task = await this.service.delete(id)

        return succcessResponse(res, task, 200)
    }
}