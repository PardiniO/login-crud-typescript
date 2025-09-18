import { IUsuario } from "../interfaces/usuarios";
export declare class AuthService {
    static register(data: {
        email: string;
        contraseña: string;
        nombre?: string;
        rol?: 'user' | 'admin';
    }): Promise<IUsuario>;
    static login(email: string, contraseña: string): Promise<{
        token: string;
        user: Omit<IUsuario, 'contraseña'>;
    }>;
}
