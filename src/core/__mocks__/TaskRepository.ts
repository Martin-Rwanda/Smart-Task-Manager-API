import { ITaskRepository } from "../../modules/task/repositories";
import { Task } from "../../modules/task/entinties";

class MockTaskRepository implements ITaskRepository {
    create = jest.fn();
    findById = jest.fn();
    findAll = jest.fn();
    delete = jest.fn();
    update = jest.fn();
    findByStatus = jest.fn();
}
export const mockTaskRepository = new MockTaskRepository()