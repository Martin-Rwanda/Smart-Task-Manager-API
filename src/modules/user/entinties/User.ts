import { Role } from "../../auth/types";

export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string,
        public role: Role,
        public isActive: boolean,
        public readonly createdAt: Date
    ){}
}