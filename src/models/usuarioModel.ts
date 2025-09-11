import { select, execute } from "../config/db";
import { IUsuario } from "../interfaces/usuarios";
import { ResultSetHeader, RowDataPacket } from "mysql2";

//corregir y pushear al repo

export class UsuarioModel {
    static async create(user:Omit<IUsuario, "id" | "fechaCreacion">): Promise<IUsuario> {
        const result: ResultSetHeader = await execute(
            "INSERT INTO usuario (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)", 
            [user.nombre, user.email, user.contraseña, user.rol]
        );
        return {
            id: result.insertId,
            nombre: user.nombre,
            email: user.email,
            contraseña: user.contraseña,
            rol: user.rol
        };
    }

    static async buscarPorEmail(email: string): Promise<IUsuario | null> {
        const rows = await select<RowDataPacket[]>(`
            SELECT id, nombre, email, contraseña, rol, fechaCreación 
            FROM usuario WHERE email = ?`, [email]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            id: row.id,
            nombre: row.nombre,
            email: row.email,
            contraseña: row.contraseña,
            rol: row.rol,
            fechaCreacion: new Date(row.fechaCreacion)
        };
    }

    static async buscarPorId(id: number): Promise<IUsuario | null> {
        const rows = await select<RowDataPacket[]>(`
            SELECT id, nombre, email, contraseña, rol, fechaCreacion
            FROM usuario WHERE id = ?`, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            id: row.id,
            nombre: row.nombre,
            email: row.email,
            contraseña: row.contraseña,
            rol: row.rol,
            fechaCreacion: new Date(row.fechaCreacion)
        };
    }

    static async buscarTodo(): Promise<IUsuario[]> {
        const rows = await select<RowDataPacket[]>(`
            SELECT id, nombre, email, contraseña, rol, fechaCreacion
            FROM usuario`, []);
        return rows.map((row) => ({
            id: row.id,
            nombre: row.nombre,
            email: row.email,
            contraseña: row.contraseña,
            rol: row.rol,
            fechaCreacion: new Date(row.fechaCreacion)
        }));
    }

    static async actualizarPorId(id: number, updates: Partial<Omit<IUsuario, "id" | "fechaCreacion">>): Promise<IUsuario | null> {
        const campos: string[] = [];
        const params: Array<string | number | Date | null> = [];

        if (updates.nombre !== undefined) {
            campos.push("nombre = ?");
            params.push(updates.nombre);
        }
        if (updates.email !== undefined) {
            campos.push("email = ?");
            params.push(updates.email);
        }
        if (updates.contraseña !== undefined) {
            campos.push("contraseña = ?");
            params.push(updates.contraseña);
        }
        if (updates.rol !== undefined) {
            campos.push("role = ?");
            params.push(updates.rol);
        }
        if (campos.length === 0) {
            return this.buscarPorId(id);
        }

        const sql = `UPDATE usuario SET ${campos.join(", ")} WHERE id = ?`;
        params.push(id);
        
        const result = await execute(sql, params);
        if (result.affectedRows === 0) return null;
        return this.buscarPorId(id);
    }

    static async borrarPorId(id: number): Promise<boolean> {
        const result = await execute("DELETE FROM usuario WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}