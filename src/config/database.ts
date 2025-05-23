import 'reflect-metadata';
import dotenv from 'dotenv';
import { User } from '../usecases/user/entity';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  logging: false,
  subscribers: [],
  type: 'postgres',
  entities: [User],
  synchronize: false,
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  migrations: ['dist/migration/*.js'],
});
