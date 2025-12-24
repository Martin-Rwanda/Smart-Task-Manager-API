"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskService_1 = require("../TaskService");
const entinties_1 = require("../../entinties");
const errors_1 = require("../../../../core/errors");
const mockRepository = () => ({
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByStatus: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});
describe("TaskService - createTask", () => {
    it("should create a task successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = mockRepository();
        const service = new TaskService_1.TaskService(repository);
        const task = new entinties_1.Task("123", "Test task", "Testing service", entinties_1.TaskStatus.PENDING);
        repository.create.mockResolvedValue(task);
        const result = yield service.create({
            title: "Test task",
            description: "Testing Service"
        });
        expect(repository.create).toHaveBeenCalled();
        expect(result.title).toBe("Test task");
        expect(result.status).toBe(entinties_1.TaskStatus.PENDING);
    }));
    it("should throw error if title is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = mockRepository();
        const service = new TaskService_1.TaskService(repository);
        yield expect(service.create({
            title: "Hi",
            description: "Invalid task"
        })).rejects.toThrow(errors_1.AppError);
    }));
    it("should update task status to DONE", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = mockRepository();
        const service = new TaskService_1.TaskService(repository);
        const task = new entinties_1.Task("123", "Task", "Desc", entinties_1.TaskStatus.PENDING);
        repository.findById.mockResolvedValue(task);
        repository.update.mockResolvedValue(task);
        const result = yield service.updateTaskStatus("123", entinties_1.TaskStatus.DONE);
        expect(result.status).toBe(entinties_1.TaskStatus.DONE);
        expect(repository.update).toHaveBeenCalled();
    }));
    it("should throw error if task not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = mockRepository();
        const service = new TaskService_1.TaskService(repository);
        repository.findById.mockResolvedValue(null);
        yield expect(service.updateTaskStatus("999", entinties_1.TaskStatus.DONE)).rejects.toThrow(errors_1.AppError);
    }));
});
