import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch(error) {
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
}
