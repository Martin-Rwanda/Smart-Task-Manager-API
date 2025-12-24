import { IUserRepository } from "../../modules/user/repositories/UserRepository";
import { User } from "../../modules/user/entinties";

export class MockUserRepository implements IUserRepository {
    create = jest.fn();
    findById = jest.fn();
    findAll = jest.fn();
    delete = jest.fn();
    update = jest.fn();
    findByEmail = jest.fn();
}