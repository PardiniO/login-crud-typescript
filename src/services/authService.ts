import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUsuario } from "../interfaces/usuarios";
import { UsuarioService } from "./usuarioService";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export class AuthService {
    static async register(data: { 
        email: string; 
        contraseña: string; 
        nombre?: string; 
        rol?: 'user' | 'admin' }): Promise<IUsuario> {
        const user = await UsuarioService.register(data);
        return user;
    }

    static async login(email: string, contraseña: string): Promise<{ 
        token: string;
        user: Omit<IUsuario, 'contraseña'> }> {
        const user = await UsuarioService.authenticate(email, contraseña);
        if (!user) throw new Error("Usuario no encontrado");
        
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
        JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { token, user };
    }
}