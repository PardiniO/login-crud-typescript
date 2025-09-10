export interface IUsuario {
    id?: number,
    nombre: string,
    email: string,
    contraseña: string,
    rol: "user" | "admin",
    fechaCreacion?: Date
}