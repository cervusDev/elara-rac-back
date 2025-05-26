import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  banner?: string;

  @Column()
  address!: string;

  @Column('date')
  date!: string;

  @Column('time')
  time!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column('int')
  maxParticipants!: number;

  @CreateDateColumn()
  createdAt!: Date;
}