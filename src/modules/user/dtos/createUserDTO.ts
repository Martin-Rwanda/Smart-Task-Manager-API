import { Role } from "../../auth/types";

export interface CreateUserkDTO {
    email: string;
    password: string;
    role: Role;
}