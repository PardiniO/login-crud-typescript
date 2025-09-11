export type Role = "user" | "admin";

export interface IUsuario {
    id?: number,
    nombre: string,
    email: string,
    contraseña: string,
    rol: Role,
    fechaCreacion?: Date
}