import { pool } from "../config/db";
import { IUsuario } from "../interfaces/usuarios";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class UsuarioModel {
    static async create(user:Omit<IUsuario, 'id' | 'fechaCreacion' | 'fechaModificacion'>): Promise<number> {
        const { nombre, email, contraseña, rol } = user;
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO usuario (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)", 
            [nombre, email, contraseña ?? null, rol]
        );
        return result.insertId;
    }
    
    static async buscarPorEmail(email: string): Promise<IUsuario | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT id, nombre, email, contraseña, rol, fechaCreación 
            FROM usuario WHERE email = ?`, [email]);
        const result = rows[0] as IUsuario | undefined;
        return result ?? null;
    }

    static async buscarPorId(id: number): Promise<IUsuario | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT id, nombre, email, contraseña, rol, fechaCreacion, fechaModificacion
            FROM usuario WHERE id = ?`, [id]);
        const result = rows[0] as IUsuario | undefined;
        return result ?? null;
    }

    static async actualizarPorId(id: number, campos: Partial<IUsuario>): Promise<void> {
        const entradas = Object.entries(campos) as [keyof IUsuario, IUsuario[keyof IUsuario]][];
        if (entradas.length === 0) return;

        const placeholders = entradas.map(([key]) => `${key} = ?`).join(', ');
        const values = entradas.map(([,value])=> value);

        await pool.query(
            `UPDATE usuario SET ${placeholders} WHERE id = ?`,
            [...values, id]
        );
    }

    static async borrarPorId(id: number): Promise<void> {
        await pool.query("DELETE FROM usuario WHERE id = ?", [id]);
    }

    static async listarTodo(): Promise<IUsuario[]> {
        const [rows] = await pool.query('SELECT id, nombre, email, rol, fechaCreacion, fechaModificacion FROM usuario');
        return rows as IUsuario[];
    }
}