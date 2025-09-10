import { pool } from "../config/db";
import { IUsuario } from "../interfaces/usuarios";
//corregir y pushear al repo
export class UsuarioModel {
    static async create(user:IUsuario): Promise<IUsuario> {
        const result = await pool<IUsuario>(
            "INSERT INTO usuario (nombre, email, contraseña) VALUES (?, ?, ?)", 
            [user.nombre, user.email, user.contraseña]
        );
        return result[0];
    }

    static async buscarPorEmail(email: string): Promise<IUsuario | null> {
        const result = await pool<IUsuario>(
            "SELECT * FROM usuario WHERE email = ?", [email]
        );
        return result[0] || null;
    }
}