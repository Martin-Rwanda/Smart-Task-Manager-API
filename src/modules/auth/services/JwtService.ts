import jwt, { JwtPayload as JwtLibPayload } from 'jsonwebtoken';
import { Role } from '../types';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = '1h';

export interface AppJwtPayload {
    userId: string;
    role: Role;
}


export class JwtService {
    static sign(payload: AppJwtPayload): string {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })
    }

    static verify(token: string): AppJwtPayload {
        return jwt.verify(token, JWT_SECRET) as AppJwtPayload;
    }

    static getExpirationDate(token: string): Date {
        const decoded = jwt.decode(token) as JwtLibPayload | null;

        if (!decoded || !decoded.exp) {
            throw new Error("Token has no expiration");
        }

        return new Date(decoded.exp * 1000);
    }
}