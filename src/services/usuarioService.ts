import bcrypt from "bcrypt";
import { IUsuario } from "../interfaces/usuarios";
import { UsuarioModel } from "../models/usuarioModel";

export class UsuarioService {
    static async register(data: {
        email: string;
        contraseña: string;
        nombre?: string;
        rol?: 'user'|'admin';
    }): Promise<IUsuario> {
        const existe: IUsuario | null = await UsuarioModel.buscarPorEmail(data.email);
        if (existe) throw new Error("Email ya registrado");

        const hashed: string = await bcrypt.hash(data.contraseña, 10);

        const id: number = await UsuarioModel.create({
            nombre: data.nombre ?? null,
            email: data.email,
            contraseña: hashed,
            rol: data.rol ?? 'user'
        });

        const creado: IUsuario | null = await UsuarioModel.buscarPorId(id);
        if (!creado) throw new Error("Error al crear usuario");
        return creado;
    }

    static async authenticate(email: string, contraseña: string): Promise<Omit<IUsuario, 'contraseña'>> {
        const user: IUsuario | null = await UsuarioModel.buscarPorEmail(email);
        if (!user) throw new Error("Credenciales inválidas");
        
        const ok: boolean = await bcrypt.compare(contraseña, user.contraseña);
        if (!ok) throw new Error("Credenciales inválidas");
        
        const { contraseña: _contraseña, ...userSinPass } = user;
        return userSinPass;
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
        return UsuarioModel.listarTodo();
    }

    static async actualizarUsuario(targetId: number, updates: Partial<IUsuario>): Promise <void> {
        const dataActualizada: Partial<IUsuario> = { ...updates };

        if (dataActualizada.contraseña) {
            dataActualizada.contraseña = await bcrypt.hash(dataActualizada.contraseña, 10);
        }
        
        await UsuarioModel.actualizarPorId(targetId, dataActualizada);
    }

    static async borrarUsuario(requester: { id: number; role: "user" | "admin" }, id: number): Promise<void> {
        if (requester.role !== "admin" && requester.id !== id) {
            throw new Error("Prohibido el acceso a usuarios no admin");
        }
        await UsuarioModel.borrarPorId(id);
    }
}