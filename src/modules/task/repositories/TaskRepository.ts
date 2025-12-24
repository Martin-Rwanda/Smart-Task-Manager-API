import { IBaseRepository } from "../../../core/repositories";
import { Task } from "../entinties";

export interface ITaskRepository extends IBaseRepository<Task> {
    findByStatus(status: string): Promise<Task[]>
}