import { IBaseRepository } from "../../../core/repositories/IBaseRepository";
import { User } from "../entinties";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}