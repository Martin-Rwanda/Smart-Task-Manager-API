import { User } from "../entinties";
import { Role } from "../../auth/types";

export const mapRowToUser = (row: any): User => {
    return new User(
        row.id,
        row.email,
        row.password_hash,
        row.role as Role,
        row.is_active,
        row.created_at
    )
}