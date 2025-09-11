import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUsuario } from "../interfaces/usuarios";
import { UsuarioModel } from "../models/usuarioModel";

export class AuthService {
    static async register(user: IUsuario): Promise<IUsuario> {
        const hashedPassword: string = await bcrypt.hash(user.contraseña, 10);
        return await UsuarioModel.create({ ...user, contraseña: hashedPassword });
    }

    static async login(email: string, contraseña: string): Promise<string> {
        const user = await UsuarioModel.buscarPorEmail(email);
        if (!user) throw new Error("Usuario no encontrado");
        
        const valid: boolean = await bcrypt.compare(contraseña, user.contraseña);
        if (!valid) throw new Error("Contraseña incorrecta");
        
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET no configurado");
        
        const payload = { id: user.id, email: user.email, rol: user.rol };
        const expires: string = process.env.JWT_EXPIRES ?? "1h";
        const options: SignOptions = { expiresIn: expires };
        const token: string = jwt.sign( payload, secret, options);
        return token;
    }
}