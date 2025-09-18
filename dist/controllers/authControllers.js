"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static async register(req, res) {
        const { nombre, email, contraseña, rol } = req.body;
        if (!email || !contraseña) {
            return res.status(400).json({ message: 'Se necesita email y contraseña' });
        }
        try {
            const user = await authService_1.AuthService.register({ email, contraseña, nombre, rol });
            return res.status(201).json(user);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Error al registrarse';
            return res.status(400).json({ message });
        }
    }
    static async login(req, res) {
        const { nombre, email, contraseña, rol } = req.body;
        if (!email || !contraseña || !nombre || !rol) {
            return res.status(400).json({ message: 'Se necesitan todos los campos' });
        }
        try {
            const { token, user } = await authService_1.AuthService.login(email, contraseña);
            return res.json({ token, user });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Credenciales inválidas';
            return res.status(401).json({ message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authControllers.js.map