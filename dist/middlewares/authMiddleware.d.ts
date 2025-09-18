import { Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/authRequest";
export declare function authGuard(req: AuthRequest, res: Response, next: NextFunction): void;
export declare function authRole(roles: Array<'admin' | 'user'>): (req: AuthRequest, res: Response, next: NextFunction) => void;
