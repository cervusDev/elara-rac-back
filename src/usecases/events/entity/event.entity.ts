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

  @Column({ type: 'integer', default: 0, name: 'max_participants' })
  maxParticipants!: number;

  @Column({ type: 'integer', default: 0, name: 'number_of_participants' })
  participants!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}