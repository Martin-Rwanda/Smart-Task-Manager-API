import { Task, TaskStatus } from "../entinties";

export const mapRowToTask = (row: any): Task => {
    return new Task(
        row.id,
        row.title,
        row.description,
        row.status as TaskStatus,
        row.assigned_to ?? undefined,
        row.created_at,
        row.updated_at
    )
}