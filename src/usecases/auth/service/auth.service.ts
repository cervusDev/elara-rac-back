import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../user/repository/user.repository';

interface LoginProps {
  email: string;
  password: string;
}

dotenv.config();

export class AuthService {
  private repository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login({ email, password }: LoginProps) {
    const user = await this.repository.findByEmail({ email });

    if (!user) {
      throw new Error('Email inválido.');
    };
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      throw new Error('Senha inválida.');
    };
    
    const userToken = { id: user.id, email: user.email, name: user.name };
    const token = jwt.sign(userToken, process.env.JWT_SECRET as string, { expiresIn: '4h' });
    
    return {
      token,
      user: userToken
    }
  }
}