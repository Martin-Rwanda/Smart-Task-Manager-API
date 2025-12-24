import {Pool} from 'pg';
import {config as DotEnv} from 'dotenv';
import { logger } from '../core/logging';

DotEnv();

export class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        logger.info('Database connected');
    }

    public static getInstance(): Database {
        if(!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }
}