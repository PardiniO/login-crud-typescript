"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    const { email, contraseña } = req.body;
    if (email === 'test@test.com' && contraseña === '1234') {
        const respuesta = {
            success: true,
            data: { token: 'Token falso' },
            message: 'Login exitoso'
        };
        return res.status(200).json(respuesta);
    }
    const respuesta = {
        success: false,
        message: 'Credenciales inválidas'
    };
    return res.status(401).json(respuesta);
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map