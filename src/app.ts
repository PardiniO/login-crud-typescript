import express, { Application, Request, Response, NextFunction } from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import { respuestaAPI } from './interfaces/respuestaAPI';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rutas
app.get('/', (_req: Request, res: Response) => {
    const respuesta: respuestaAPI<string> = {
        success: true,
        data: 'Servidor Express con TypeScript funcionando!',
        message: 'API lista para usar'
    };
    res.json(respuesta);
});

app.use('/api/usuarios', usuarioRoutes);

// Start server
app.listen(PORT, () => {
    console.log('🚀 Servidor Express con TypeScript iniciado');
    console.log(`📡 Servidor corriendo en: http://localhost:${PORT}`);
});