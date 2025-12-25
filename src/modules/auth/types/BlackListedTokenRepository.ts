import { Pool } from "pg";

export class BlacklistedTokenRepository {
    constructor(private pool: Pool) {}

    async blacklist(token: string, expiresAt: Date): Promise<void> {
        const query = `
            INSERT INTO blacklisted_tokens (token, expires_at)
            VALUES ($1, $2)
            ON CONFLICT (token) DO NOTHING
        `;
        await this.pool.query(query, [token, expiresAt]);
    }

    async isBlacklisted(token: string): Promise<boolean> {
        const query = `
            SELECT 1 FROM blacklisted_tokens
            WHERE token = $1 AND expires_at > NOW()
        `;
        const result = await this.pool.query(query, [token]);

        return (result.rowCount ?? 0) > 0;
    }
}