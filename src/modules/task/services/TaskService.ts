import { Task, TaskStatus } from "../entinties";
import { ITaskRepository, TaskRepositoryFactory } from "../repositories";
import { randomUUID } from "crypto";
import { BaseService } from "../../../core/services";
import { AppError } from "../../../core/errors";

export class TaskService extends BaseService<Task>{
    private repository: ITaskRepository;

    constructor(repository?: ITaskRepository) {
        super();
        this.repository = repository ?? TaskRepositoryFactory.create();
    }

    async create(data: any): Promise<Task> {
        if (!data.title || data.title.length < 3) {
            throw new AppError("Task title must be at least 3 characters", 400);
        }

        const task = new Task(
            randomUUID(),
            data.title,
            data.description,
            TaskStatus.PENDING,
            data.assignedTo
        );

        return this.repository.create(task);
    }

    async getById(id: string): Promise<Task> {
        const task = await this.repository.findById(id);

        if (!task) {
            throw new AppError('Task not found', 400);
        }

        return task;
    }

    async getAll(): Promise<Task[]> {
        return this.repository.findAll();
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getById(id);

        task.updateStatus(status);

        return this.repository.update(task);
    }

    async delete(id: string): Promise<void> {
        await this.getById(id);
        return this.repository.delete(id);
    }
}