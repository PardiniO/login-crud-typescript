"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioModel_1 = require("../models/usuarioModel");
class UsuarioService {
    static async register(data) {
        const existe = await usuarioModel_1.UsuarioModel.buscarPorEmail(data.email);
        if (existe)
            throw new Error("Email ya registrado");
        const hashed = await bcrypt_1.default.hash(data.contraseña, 10);
        const id = await usuarioModel_1.UsuarioModel.create({
            nombre: data.nombre ?? null,
            email: data.email,
            contraseña: hashed,
            rol: data.rol ?? 'user'
        });
        const creado = await usuarioModel_1.UsuarioModel.buscarPorId(id);
        if (!creado)
            throw new Error("Error al crear usuario");
        return creado;
    }
    static async authenticate(email, contraseña) {
        const user = await usuarioModel_1.UsuarioModel.buscarPorEmail(email);
        if (!user)
            throw new Error("Credenciales inválidas");
        const ok = await bcrypt_1.default.compare(contraseña, user.contraseña);
        if (!ok)
            throw new Error("Credenciales inválidas");
        const { contraseña: _contraseña, ...userSinPass } = user;
        return userSinPass;
    }
    static async obtenerPorId(requester, id) {
        if (requester.rol !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        return usuarioModel_1.UsuarioModel.buscarPorId(id);
    }
    static async obtenerTodo(requester) {
        if (requester.rol !== "admin") {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        return usuarioModel_1.UsuarioModel.listarTodo();
    }
    static async actualizarUsuario(targetId, updates) {
        const dataActualizada = { ...updates };
        if (dataActualizada.contraseña) {
            dataActualizada.contraseña = await bcrypt_1.default.hash(dataActualizada.contraseña, 10);
        }
        await usuarioModel_1.UsuarioModel.actualizarPorId(targetId, dataActualizada);
    }
    static async borrarUsuario(requester, id) {
        if (requester.role !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        await usuarioModel_1.UsuarioModel.borrarPorId(id);
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuarioService.js.map