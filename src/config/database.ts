import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../usecases/user/entity/user.entity';
import { Event } from '../usecases/events/entity/event.entity';
import { Ticket } from '../usecases/ticket/entity/ticket.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  logging: false,
  subscribers: [],
  type: 'postgres',
  synchronize: true,
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Event, Ticket],
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  migrations: ['dist/migration/*.js'],
});
