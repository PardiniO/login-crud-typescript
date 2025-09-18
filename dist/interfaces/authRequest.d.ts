import { Request } from "express";
import { IUsuario } from "./usuarios";
export interface AuthRequest extends Request {
    user?: Pick<IUsuario, 'id' | 'email' | 'rol'>;
}
