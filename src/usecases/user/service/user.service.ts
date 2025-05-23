import { User } from '../entity';
import { UserRepository } from '../repository/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async listAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}