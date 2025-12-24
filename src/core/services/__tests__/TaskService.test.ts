import { TaskService } from "../../../modules/task/services/TaskService";
import { ITaskRepository } from "../../../modules/task/repositories";
import { Task, TaskStatus } from "../../../modules/task/entinties";
import { AppError } from "../../errors";
import { mockTaskRepository } from "../../__mocks__/TaskRepository";

// const mockRepository = (): jest.Mocked<ITaskRepository> => ({
//     create: jest.fn(),
//     findById: jest.fn(),
//     findAll: jest.fn(),
//     findByStatus: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
// })

describe("TaskService - createTask", () => {
    it("should create a task successfully", async () => {
        // const repository = mockRepository();
        const repository = mockTaskRepository
        const service = new TaskService(repository);

        const task = new Task(
            "123",
            "Test task",
            "Testing service",
            TaskStatus.PENDING
        )

        repository.create.mockResolvedValue(task);

        const result = await service.create({
            title: "Test task",
            description: "Testing Service"
        })

        expect(repository.create).toHaveBeenCalled();
        expect(result.title).toBe("Test task");
        expect(result.status).toBe(TaskStatus.PENDING)
    });

    it("should throw error if title is too short", async () => {
        const repository = mockTaskRepository;
        const service = new TaskService(repository);

        await expect(
            service.create({
                title: "Hi",
                description: "Invalid task"
            })
        ).rejects.toThrow(AppError)
    })

    it("should update task status to DONE", async () => {
        const repository = mockTaskRepository;
        const service = new TaskService(repository);

        const task = new Task(
            "123",
            "Task",
            "Desc",
            TaskStatus.PENDING
        )

        repository.findById.mockResolvedValue(task)
        repository.update.mockResolvedValue(task)

        const result = await service.updateTaskStatus("123", TaskStatus.DONE);

        expect(result.status).toBe(TaskStatus.DONE);
        expect(repository.update).toHaveBeenCalled()
    })

    it("should throw error if task not found", async () => {
        const repository = mockTaskRepository;
        const service = new TaskService(repository);

        repository.findById.mockResolvedValue(null);

        await expect(
            service.updateTaskStatus("999", TaskStatus.DONE)
        ).rejects.toThrow(AppError)
    })
})