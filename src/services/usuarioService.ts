import bcrypt from "bcrypt";
import { IUsuario } from "../interfaces/usuarios";
import { UsuarioModel } from "../models/usuarioModel";

export class UsuarioService {
    static async getSelf(requester: { id: number, rol: "user" | "admin" }): Promise<IUsuario | null> {
        return UsuarioModel.buscarPorId(requester.id);
    }

    static async obtenerPorId(requester: { id: number, rol: "user" | "admin" }, id: number): Promise<IUsuario | null> {
        if (requester.rol !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        return UsuarioModel.buscarPorId(id);
    }

    static async obtenerTodo(requester: { id: number, rol: "user" | "admin" }): Promise<IUsuario[]> {
        if (requester.rol !== "admin") {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        return UsuarioModel.buscarTodo();
    }

    static async actualizarUsuario(
        requester: { id: number, role: "user" | "admin" },
        id: number,
        updates: Partial<Pick<IUsuario, "email" | "contraseña" | "rol">>
    ): Promise <IUsuario | null> {
        if (requester.role !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        if (updates.rol !== undefined && requester.role !== "admin") {
            throw new Error("Solo admins pueden cambiar roles");
        }
        
        const actualizacionFinal: Partial<Pick<IUsuario, "email" | "contraseña" | "rol">> = { ...updates };
        if (updates.contraseña !== undefined) {
            actualizacionFinal.contraseña = await bcrypt.hash(updates.contraseña, 10);
        }

        return UsuarioModel.actualizarPorId(id, actualizacionFinal);
    }

    static async borrarUsuario(requester: { id: number; role: "user" | "admin" }, id: number): Promise<void> {
        if (requester.role !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        const borrado = await UsuarioModel.borrarPorId(id);
        if (!borrado) throw new Error("Usuario no encontrado");
    }
}