import { Router, Request, Response } from "express";
import { IrespuestaAPI } from "../interfaces/respuestaAPI";

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    const { email, contraseña } = req.body;

    if (email === 'test@test.com' && contraseña === '1234') {
        const respuesta: IrespuestaAPI<{ token: string }> = {
            success: true,
            data: { token: 'Token falso' },
            message: 'Login exitoso'
        };
        return res.status(200).json(respuesta);
    }

    const respuesta: IrespuestaAPI<null> = {
        success: false,
        message: 'Credenciales inválidas'
    };
    return res.status(401).json(respuesta);
});

export default router;