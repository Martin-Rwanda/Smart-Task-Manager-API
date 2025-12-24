import jwt from 'jsonwebtoken';
import { Role } from '../types';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = '1h';

export interface JwtPayload {
    userId: string;
    role: Role;
}


export class JwtService {
    static sign(payload: JwtPayload): string {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })
    }

    static verify(token: string): JwtPayload {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    }
}