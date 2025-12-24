import { Database } from "../../../config";
import { IUserRepository } from "./UserRepository";
import { User } from "../entinties";
import { mapRowToUser } from "./UserMapper";

class PostgresUserRepository implements IUserRepository {
    private pool = Database.getInstance().getPool();

    async create(user: User): Promise<User> {
        const query = `
            INSERT INTO users (
                id, email, password_hash, role, is_active, created_at
            ) VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
        `;

        const values = [
            user.id,
            user.email,
            user.password,
            user.role,
            user.isActive,
            user.createdAt
        ];

        const { rows } = await this.pool.query(query, values);
        return mapRowToUser(rows[0]);
    }

    async findById(id: string): Promise<User | null> {
        const { rows } = await this.pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        return rows[0] ? mapRowToUser(rows[0]) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const { rows } = await this.pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        return rows[0] ? mapRowToUser(rows[0]) : null;
    }

    async findAll(): Promise<User[]> {
        const { rows } = await this.pool.query("SELECT * FROM users");
        return rows.map(mapRowToUser);
    }

    async update(user: User): Promise<User> {
        const query = `
            UPDATE users
            SET email = $2,
                password_hash = $3,
                role = $4,
                is_active = $5,
            WHERE id = $1
            RETURNING *
        `;

        const values = [
            user.id,
            user.email,
            user.password,
            user.role,
            user.isActive,
        ];

        const { rows } = await this.pool.query(query, values);
        return mapRowToUser(rows[0]);
    }

    async delete(id: string): Promise<void> {
        await this.pool.query(
            "DELETE FROM users WHERE id = $1",
            [id]
        );
    }
}


export class UserRepositoryFactory {
    static create(): IUserRepository {
        return new PostgresUserRepository();
    }
}