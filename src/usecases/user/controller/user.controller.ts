import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
import { UserService } from '../service/user.service';

export class UserController {
  private userService = new UserService();

  async list(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.listAll();

      if (!users || users.length === 0) {
        logger.error({ message: 'Nenhum usuário encontrado' })
        return res.status(404).json({ message: 'Nenhum usuário encontrado' });
      }

      return res.json(users);
   
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  }
}
