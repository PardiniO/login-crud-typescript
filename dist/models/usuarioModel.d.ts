import { IUsuario } from "../interfaces/usuarios";
export declare class UsuarioModel {
    static create(user: Omit<IUsuario, 'id' | 'fechaCreacion' | 'fechaModificacion'>): Promise<number>;
    static buscarPorEmail(email: string): Promise<IUsuario | null>;
    static buscarPorId(id: number): Promise<IUsuario | null>;
    static actualizarPorId(id: number, campos: Partial<IUsuario>): Promise<void>;
    static borrarPorId(id: number): Promise<void>;
    static listarTodo(): Promise<IUsuario[]>;
}
