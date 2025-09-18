"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
router.get('/', usuarioController_1.obtenerUsuarios);
router.get('/:id', usuarioController_1.obtenerUsuarioPorId);
router.post('/', usuarioController_1.crearUsuario);
router.delete('/:id', usuarioController_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map