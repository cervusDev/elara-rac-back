import { IsNotEmpty } from 'class-validator';
import { Ticket } from '../../ticket/entity/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets!: Ticket[];
}
