import { User } from '../entity';
import { AppDataSource } from '../../../config/database';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async listAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}