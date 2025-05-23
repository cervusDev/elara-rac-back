import dotenv from 'dotenv';
import { logger } from './config/logger';
import { User } from './usecases/user/entity';
import { AppDataSource } from './config/database';
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

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');

    // Rotas
    app.get('/users', async (_req, res) => {
      const users = await AppDataSource.getRepository(User).find();
      res.json(users);
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco', error);
  });