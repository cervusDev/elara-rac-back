import dotenv from 'dotenv';
import { logger } from './logger';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rotas
app.get('/', (_req: Request, res: Response) => {
  res.send('🌍 Olá, mundo com TypeScript!');
});

// Inicialização
app.listen(PORT, () => {
  logger.info('Servidor iniciado com sucesso!');
});