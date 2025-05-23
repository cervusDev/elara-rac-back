import { User } from '../entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/database';

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
