import { JwtPayload } from "jsonwebtoken";

export interface TokenPayLoad extends JwtPayload {
    id: number;
    email: string;
    rol: 'user' | 'admin';
}