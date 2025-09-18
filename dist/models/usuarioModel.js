"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const db_1 = require("../config/db");
class UsuarioModel {
    static async create(user) {
        const { nombre, email, contraseña, rol } = user;
        const [result] = await db_1.pool.query("INSERT INTO usuario (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)", [nombre, email, contraseña ?? null, rol]);
        return result.insertId;
    }
    static async buscarPorEmail(email) {
        const [rows] = await db_1.pool.query(`
            SELECT id, nombre, email, contraseña, rol, fechaCreación 
            FROM usuario WHERE email = ?`, [email]);
        const result = rows[0];
        return result ?? null;
    }
    static async buscarPorId(id) {
        const [rows] = await db_1.pool.query(`
            SELECT id, nombre, email, contraseña, rol, fechaCreacion, fechaModificacion
            FROM usuario WHERE id = ?`, [id]);
        const result = rows[0];
        return result ?? null;
    }
    static async actualizarPorId(id, campos) {
        const entradas = Object.entries(campos);
        if (entradas.length === 0)
            return;
        const placeholders = entradas.map(([key]) => `${key} = ?`).join(', ');
        const values = entradas.map(([, value]) => value);
        await db_1.pool.query(`UPDATE usuario SET ${placeholders} WHERE id = ?`, [...values, id]);
    }
    static async borrarPorId(id) {
        await db_1.pool.query("DELETE FROM usuario WHERE id = ?", [id]);
    }
    static async listarTodo() {
        const [rows] = await db_1.pool.query('SELECT id, nombre, email, rol, fechaCreacion, fechaModificacion FROM usuario');
        return rows;
    }
}
exports.UsuarioModel = UsuarioModel;
//# sourceMappingURL=usuarioModel.js.map