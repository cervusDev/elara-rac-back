import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @Column()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  passw!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
