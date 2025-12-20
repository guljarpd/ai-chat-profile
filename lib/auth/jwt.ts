import jwt from "jsonwebtoken";
import { EXPIRES_IN } from "@/constants";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
    };
}