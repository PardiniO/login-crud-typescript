import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayLoad } from "../interfaces/tokenPayLoad";
import { AuthRequest } from "../interfaces/authRequest";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se ha proporcionado ningún token' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayLoad;
        req.user = {
            id: payload.id,
            email: payload.email,
            rol: payload.rol,
        };
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
}

export function authRole(roles:Array<'admin' | 'user'>) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        } 
        if (!roles.includes(req.user.rol)) {
            res.status(403).json({ message: 'Prohibido' });
            return;
        }
        next();
    };
}