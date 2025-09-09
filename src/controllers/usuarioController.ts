import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';
import { Usuario } from '../interfaces/usuarios';
import { respuestaAPI } from '../interfaces/respuestaAPI';

// Instancia única del servicio
const usuarioService = new UsuarioService();

// Obtener todos los usuarios
export const obtenerUsuarios = (_req: Request, res: Response) => {
    const usuarios = usuarioService.obtenerUsuarios();

    const respuesta: respuestaAPI<Usuario[]> = {
        success: true,
        data: usuarios,
        message: `Se encontraron ${usuarios.length} usuarios`
    };

    res.json(respuesta);
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const usuario = usuarioService.buscarPorId(id);

    if (usuario) {
        const respuesta: respuestaAPI<Usuario> = {
            success: true,
            data: usuario,
            message: 'Usuario encontrado'
        };
        res.json(respuesta);
    } else {
        const respuesta: respuestaAPI<null> = {
            success: false,
            message: 'Usuario no encontrado'
        };
        res.status(404).json(respuesta);
    }
};

// Crear un nuevo usuario
export const crearUsuario = (req: Request, res: Response) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        const respuesta: respuestaAPI<null> = {
            success: false,
            message: 'Nombre y email son requeridos'
        };
        res.status(400).json(respuesta);
    }

    const nuevoUsuario = usuarioService.agregarUsuario(nombre, email, contraseña);

    const respuesta: respuestaAPI<Usuario> = {
        success: true,
        data: nuevoUsuario,
        message: 'Usuario creado exitosamente'
    };

    res.status(201).json(respuesta);
};

// Eliminar un usuario
export const eliminarUsuario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const eliminado = usuarioService.eliminarUsuario(id);

    if (eliminado) {
        const respuesta: respuestaAPI<null> = {
            success: true,
            message: 'Usuario eliminado exitosamente'
        };
        res.json(respuesta);
    } else {
        const respuesta: respuestaAPI<null> = {
            success: false,
            message: 'Usuario no encontrado'
        };
        res.status(404).json(respuesta);
    }
};