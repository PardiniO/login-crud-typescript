"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
app.get('/', (_req, res) => {
    const respuesta = {
        success: true,
        data: 'Servidor Express con TypeScript funcionando!',
        message: 'API lista para usar'
    };
    res.json(respuesta);
});
app.use('/api/usuarios', usuarioRoutes_1.default);
app.listen(PORT, () => {
    console.log('🚀 Servidor Express con TypeScript iniciado');
    console.log(`📡 Servidor corriendo en: http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map