"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuarioService_1 = require("./usuarioService");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secreto';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
class AuthService {
    static async register(data) {
        const user = await usuarioService_1.UsuarioService.register(data);
        return user;
    }
    static async login(email, contraseña) {
        const user = await usuarioService_1.UsuarioService.authenticate(email, contraseña);
        if (!user)
            throw new Error("Usuario no encontrado");
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { token, user };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map