import { User } from "../entinties";
import { IUserRepository, UserRepositoryFactory } from "../repositories";
import { randomUUID } from "crypto";
import { AppError } from "../../../core/errors";
import { Role } from "../../auth/types";
import { PasswordService } from "../../auth/services";

export class UserService {
    private repository: IUserRepository;

    constructor(repository?: IUserRepository) {
        this.repository = repository ?? UserRepositoryFactory.create();
    }

    async create(data: {
        email: string;
        password: string;
        role?: Role;     
        isActive?: boolean; 
    }): Promise<User> {
        if (!data.email || !data.password) {
            throw new AppError("Email and password are required", 400);
        }

        const existing = await this.repository.findByEmail(data.email);
        if (existing) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await PasswordService.hash(data.password);

        const user = new User(
            randomUUID(),
            data.email,
            hashedPassword,
            data.role ?? Role.USER,
            data.isActive ?? true,
            new Date()
        );

        return this.repository.create(user);
    }

    async getAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }

    async update(id: string, updates: Partial<User>): Promise<User> {
        const user = await this.getById(id);
        const updatedUser = { ...user, ...updates };
        return this.repository.update(updatedUser);
    }

    async delete(id: string): Promise<void> {
        await this.getById(id);
        return this.repository.delete(id);
    }

    async updateRole(userId: string, role: Role): Promise<User> {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (!Object.values(Role).includes(role)) {
            throw new AppError("Invalid role", 400);
        }

        user.role = role;
        return this.repository.update(user);
    }
}