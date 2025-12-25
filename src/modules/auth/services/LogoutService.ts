import { Database } from "../../../config";
import { logger } from "../../../core/logging";
import { BlacklistedTokenRepository } from "../types";
import { JwtService } from "./JwtService";
import { Pool } from "pg";

export class LogoutService {
    private repo: BlacklistedTokenRepository;

    constructor(pool: Pool) {
        this.repo = new BlacklistedTokenRepository(pool);
    }

    async logout(token: string): Promise<void> {
       try {
            const expiresAt = JwtService.getExpirationDate(token);
            await this.repo.blacklist(token, expiresAt);
        } catch (error) {
            logger.warn(
                {
                    err: error instanceof Error ? error.message : error,
                },
                "Logout token invalid or already expired"
            );
        }
    }

    async isBlacklisted(token: string): Promise<boolean> {
        return this.repo.isBlacklisted(token);
    }
}
const pool = Database.getInstance().getPool();
export const logoutService = new LogoutService(pool);