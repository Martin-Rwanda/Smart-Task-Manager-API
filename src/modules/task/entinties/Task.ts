import { AppError } from "../../../core/errors";

export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export class Task {
    constructor (
        public readonly id: string,
        public title: string,
        public description: string,
        public status: TaskStatus = TaskStatus.PENDING,
        public assignedTo?: string,
        public readonly createdAt: Date= new Date(),
        public updatedAt: Date = new Date()
    ) {}

    markInProgress() {
        if (this.status !== TaskStatus.PENDING) {
            throw new Error('Task cannot be moved to IN_PROGRESS');
        }
        this.status = TaskStatus.IN_PROGRESS;
        this.updatedAt = new Date();
    }

    markDone() {
        if (this.status === TaskStatus.DONE) {
            throw new Error('Task is already DONE');
        }
        this.status = TaskStatus.DONE;
        this.updatedAt = new Date();
    }

    updateStatus(newStatus: TaskStatus) {
        if (this.status === newStatus) return;

        switch (newStatus) {
            case TaskStatus.IN_PROGRESS:
                this.markInProgress();
                break;
            case TaskStatus.DONE:
                this.markDone();
                break;
            default:
                throw new AppError('Invalid status transition');
        }
    }
}