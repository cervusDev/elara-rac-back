import { Response, Request } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  };

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login({ email, password });
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ message: 'Erro ao realizar o login' });
    };
  };
};