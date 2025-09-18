import { IUsuario } from "../interfaces/usuarios";
export declare class UsuarioService {
    static register(data: {
        email: string;
        contraseña: string;
        nombre?: string;
        rol?: 'user' | 'admin';
    }): Promise<IUsuario>;
    static authenticate(email: string, contraseña: string): Promise<Omit<IUsuario, 'contraseña'>>;
    static obtenerPorId(requester: {
        id: number;
        rol: "user" | "admin";
    }, id: number): Promise<IUsuario | null>;
    static obtenerTodo(requester: {
        id: number;
        rol: "user" | "admin";
    }): Promise<IUsuario[]>;
    static actualizarUsuario(targetId: number, updates: Partial<IUsuario>): Promise<void>;
    static borrarUsuario(requester: {
        id: number;
        role: "user" | "admin";
    }, id: number): Promise<void>;
}
