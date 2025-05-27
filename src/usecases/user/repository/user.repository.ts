import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { AppDataSource } from '../../../config/database';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail({ email }: { email: string }): Promise<User | null> {
    return this.repository.findOne({ where: { email }})
  }

  async create(data: User): Promise<User> {
    return this.repository.create(data);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
