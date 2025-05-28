import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../user/repository/user.repository';

interface LoginProps {
  cpf: string;
  password: string;
}

dotenv.config();

export class AuthService {
  private repository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login({ cpf, password }: LoginProps) {
    const user = await this.repository.findByCpf(cpf);
    
    if (!user) {
      throw new Error('CPF inválido.');
    };
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      throw new Error('Senha inválida.');
    };
    
    const userToken = { 
      id: user.id, 
      cpf: user.cpf,
      name: user.name, 
      email: user.email, 
      phone: user.phone,
    };
    const token = jwt.sign(userToken, process.env.JWT_SECRET as string, { expiresIn: '4h' });
    
    return {
      token,
      user: userToken
    }
  }
}