"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.crearUsuario = exports.obtenerUsuarioPorId = exports.obtenerUsuarios = void 0;
const usuarioModel_1 = require("../models/usuarioModel");
const obtenerUsuarios = async (_req, res) => {
    try {
        const usuarios = await usuarioModel_1.UsuarioModel.listarTodo();
        const respuesta = {
            success: true,
            data: usuarios,
            message: `Se encontraron ${usuarios.length} usuarios`
        };
        return res.status(200).json(respuesta);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Error al obtener usuarios';
        const respuesta = { success: false, message };
        return res.status(500).json(respuesta);
    }
    ;
};
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuarioPorId = async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        const respuesta = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }
    try {
        const usuario = await usuarioModel_1.UsuarioModel.buscarPorId(id);
        if (usuario) {
            const respuesta = {
                success: true,
                data: usuario,
                message: 'Usuario ${usuario} encontrado'
            };
            return res.status(200).json(respuesta);
        }
        else {
            const respuesta = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Error al buscar usuario';
        const respuesta = { success: false, message };
        return res.status(500).json(respuesta);
    }
};
exports.obtenerUsuarioPorId = obtenerUsuarioPorId;
const crearUsuario = async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;
    if (!nombre || !email) {
        const respuesta = {
            success: false,
            message: 'Nombre y email son requeridos'
        };
        return res.status(400).json(respuesta);
    }
    try {
        const crearResultado = await usuarioModel_1.UsuarioModel.create({ nombre, email, contraseña, rol });
        if (typeof crearResultado === 'number') {
            const nuevoUsuario = await usuarioModel_1.UsuarioModel.buscarPorId(crearResultado);
            if (!nuevoUsuario) {
                const respuesta = { success: false, message: 'Error al recuperar usuario creado' };
                return res.status(500).json(respuesta);
            }
            const respuesta = {
                success: true,
                data: nuevoUsuario,
                message: 'Usuario creado correctamente'
            };
            return res.status(201).json(respuesta);
        }
        else {
            const respuesta = { success: false, message: 'Error al crear usuario' };
            return res.status(500).json(respuesta);
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Error al crear usuario';
        const respuesta = { success: false, message };
        return res.status(500).json(respuesta);
    }
};
exports.crearUsuario = crearUsuario;
const eliminarUsuario = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        const respuesta = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }
    try {
        const resultado = await usuarioModel_1.UsuarioModel.borrarPorId(id);
        const borrado = typeof resultado === 'number' ? resultado > 0 : Boolean(resultado);
        if (borrado) {
            const respuesta = {
                success: true,
                message: 'Usuario eliminado exitosamente'
            };
            return res.status(200).json(respuesta);
        }
        else {
            const respuesta = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
        const respuesta = { success: false, message };
        return res.status(500).json(respuesta);
    }
};
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuarioController.js.map