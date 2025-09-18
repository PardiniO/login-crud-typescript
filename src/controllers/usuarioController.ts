import { Request, Response } from 'express';
import { UsuarioModel } from "../models/usuarioModel";
import { IUsuario } from '../interfaces/usuarios';
import { IrespuestaAPI } from "../interfaces/respuestaAPI";

export const obtenerUsuarios = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const usuarios: IUsuario[] = await UsuarioModel.listarTodo();
        
        const respuesta: IrespuestaAPI<IUsuario[]> = {
            success: true,
            data: usuarios,
            message: `Se encontraron ${usuarios.length} usuarios`
        };
        return res.status(200).json(respuesta);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al obtener usuarios';
        const respuesta: IrespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    };
};

export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        const respuesta: IrespuestaAPI<null> = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }

    try {
        const usuario = await UsuarioModel.buscarPorId(id);
        if (usuario) {
            const respuesta: IrespuestaAPI<IUsuario> = {
                success: true,
                data: usuario,
                message: 'Usuario ${usuario} encontrado'
            };
        return res.status(200).json(respuesta);
        } else {
            const respuesta: IrespuestaAPI<null> = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al buscar usuario';
        const respuesta: IrespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};

export const crearUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { nombre, email, contraseña, rol } = req.body as IUsuario;

    if (!nombre || !email) {
        const respuesta: IrespuestaAPI<null> = {
            success: false,
            message: 'Nombre y email son requeridos'
        };
        return res.status(400).json(respuesta);
    }
    
    try {
        const crearResultado = await UsuarioModel.create({ nombre, email, contraseña, rol } as IUsuario);

        if (typeof crearResultado === 'number') {
            const nuevoUsuario = await UsuarioModel.buscarPorId(crearResultado);

            if (!nuevoUsuario) {
                const respuesta: IrespuestaAPI<null> = {  success: false, message: 'Error al recuperar usuario creado' };
                return res.status(500).json(respuesta);
            }
            const respuesta: IrespuestaAPI<IUsuario> = {
                success: true,
                data: nuevoUsuario,
                message: 'Usuario creado correctamente'
            };
            return res.status(201).json(respuesta);
        } else {
            const respuesta: IrespuestaAPI<null> = { success: false, message: 'Error al crear usuario' };
            return res.status(500).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al crear usuario';
        const respuesta: IrespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};

export const eliminarUsuario = async (req: Request, res: Response): Promise<Response> => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        const respuesta: IrespuestaAPI<null> = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }

    try {
        const resultado = await UsuarioModel.borrarPorId(id);

        const borrado = typeof resultado === 'number' ? resultado > 0 : Boolean(resultado);

        if (borrado) {
            const respuesta: IrespuestaAPI<null> = {
                success: true,
                message: 'Usuario eliminado exitosamente'
            };
            return res.status(200).json(respuesta);
        } else {
            const respuesta: IrespuestaAPI<null> = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
        const respuesta: IrespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};