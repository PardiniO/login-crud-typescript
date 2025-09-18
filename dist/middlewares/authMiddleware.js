"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
exports.authRole = authRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secreto';
function authGuard(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se ha proporcionado ningún token' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = {
            id: payload.id,
            email: payload.email,
            rol: payload.rol,
        };
        next();
    }
    catch {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
}
function authRole(roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }
        if (!roles.includes(req.user.rol)) {
            res.status(403).json({ message: 'Prohibido' });
            return;
        }
        next();
    };
}
//# sourceMappingURL=authMiddleware.js.map