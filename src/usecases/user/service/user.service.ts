import bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { validateEntity } from '../../../abstracts/validateEntity';

interface CrateResponse {
  name: string;
  email: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async listAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new Error("Erro na busca de usuário");
    };
    
    return users;
  }

  async create(data: User): Promise<CrateResponse> {
    const userExist = await this.userRepository.findByEmail({ email: data.email })

    if (userExist) {
      throw new Error("Esse email já está em uso")
    }

    const hash = await bcrypt.hash(data.password, 12);
    data.password = hash;
    
    const newUser = await this.userRepository.create(data);
    await validateEntity(newUser);

    const user = await this.userRepository.save(newUser);

    return {
      email: user.email,
      name: user.name,
    }
  }
}