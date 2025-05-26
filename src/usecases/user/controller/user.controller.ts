import { Request, Response } from 'express';
import { logger } from '../../../config/logger';
import { UserService } from '../service/user.service';

export class UserController {
  private userService = new UserService();

  async list(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.listAll();
      return res.json(users);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch(error) {
      logger.error(error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
}
