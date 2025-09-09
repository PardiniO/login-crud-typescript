import { Usuario } from "../interfaces/usuarios";
//models
//bcrypt
//jwt

export class UsuarioService {
    private usuarios: Usuario[] = [];
    private contadorId: number = 1;

    agregarUsuario(nombre: string, email: string, contraseña: string): Usuario {
        const nuevoUsuario: Usuario = {
            id: this.contadorId++,
            nombre,
            email,
            contraseña,
            fechaCreacion: new Date(),
            rol: "user"
        };
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    obtenerUsuarios(): Usuario[] {
        return this.usuarios;
    }

    buscarPorId(id: number): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.id === id);
    }

    eliminarUsuario(id: number): boolean {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index !== -1) {
            this.usuarios.splice(index, 1);
            return true;
        }
        return false;
    }
}