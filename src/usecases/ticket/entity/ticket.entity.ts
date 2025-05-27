import { User } from "../../user/entity/user.entity";
import { Event } from "../../events/entity/event.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TicketStatus {
  UTILIZADO = 'utilizado',
  DISPONIVEL = 'disponivel',
  INDISPONIVEL = 'indisponivel',
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
  @JoinColumn({ name: 'eventId' })
  event!: Event;

  @ManyToOne(() => User, user => user.tickets, { nullable: true })
  @JoinColumn({ name: 'userId' })
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