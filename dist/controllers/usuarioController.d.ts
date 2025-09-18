import { Request, Response } from 'express';
export declare const obtenerUsuarios: (_req: Request, res: Response) => Promise<Response>;
export declare const obtenerUsuarioPorId: (req: Request, res: Response) => Promise<Response>;
export declare const crearUsuario: (req: Request, res: Response) => Promise<Response>;
export declare const eliminarUsuario: (req: Request, res: Response) => Promise<Response>;
