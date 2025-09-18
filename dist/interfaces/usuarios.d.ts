export type Role = "user" | "admin";
export interface IUsuario {
    id?: number;
    email: string;
    contraseña: string;
    nombre?: string | null;
    rol: Role;
    fechaCreacion?: string;
    fechaModificacion?: string;
}
