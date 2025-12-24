import { Database } from "../../../config";
import { ITaskRepository } from "./TaskRepository";
import { TaskStatus, Task } from "../entinties";
import { mapRowToTask } from "./TaskMapper";

class PostgressTaskRepository implements ITaskRepository {
    private pool = Database.getInstance().getPool();

    async create(task: Task): Promise<Task> {
        // placeholder (real SQL later)
        const query = `INSERT INTO tasks (id, title, description, status, assigned_to, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

        const values = [
            task.id,
            task.title,
            task.description,
            task.status,
            task.assignedTo ?? undefined,
            task.createdAt,
            task.updatedAt,
        ]
        const { rows } = await this.pool.query(query, values);
        return mapRowToTask(rows[0]);
    }

    async findById(id: string): Promise<Task | null> {
        const {rows} = await this.pool.query("SELECT * FROM tasks WHERE id = $1", [id])
        return rows[0] ? mapRowToTask(rows[0]): null;
    }

    async findAll(): Promise<Task[]> {
        const {rows} = await this.pool.query("SELECT * FROM tasks")
        return rows.map(mapRowToTask);
    }

    async findByStatus(status: string): Promise<Task[]> {
        const {rows} = await this.pool.query("SELECT * FROM tasks WHERE status = $1", [status])
        return rows.map(mapRowToTask);
    }

    async update(task: Task): Promise<Task> {
        const query = `UPDATE tasks SET title = $2, description = $3, status = $4, assigned_to = $5, updated_at = $6 WHERE id = $1 RETURNING *`;
        const values = [
            task.id,
            task.title,
            task.description,
            task.status,
            task.assignedTo ?? null,
            task.updatedAt
        ]
        const {rows} = await this.pool.query(query, values)
        return mapRowToTask(rows[0]);
    }

    async delete(id: string): Promise<void> {
        await this.pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    }
}

export class TaskRepositoryFactory {
    static create(): ITaskRepository {
        return new PostgressTaskRepository();
    }
}