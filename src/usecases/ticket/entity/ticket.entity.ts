import { User } from "../../user/entity/user.entity";
import { Event } from "../../events/entity/event.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TicketStatus {
  DISPONIVEL = 'disponivel',
  INDISPONIVEL = 'indisponivel',
  UTILIZADO = 'utilizado',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 11 })
  cpf!: string;

  @Column({ length: 15 })
  phone!: string;

  @Column()
  address!: string;

  @ManyToOne(() => Event, event => event.tickets, { onDelete: 'CASCADE' })
  event!: Event;

  @ManyToOne(() => User, user => user.tickets, { nullable: true })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.DISPONIVEL,
  })
  status!: TicketStatus;
}