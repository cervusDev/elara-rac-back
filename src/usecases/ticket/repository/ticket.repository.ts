import { Repository } from "typeorm";
import { Ticket } from "../entity/ticket.entity";
import { User } from "../../user/entity/user.entity";
import { CreateTicketDto } from "../entity/ticket.dto";
import { AppDataSource } from "../../../config/database";
import { Event } from "../../events/entity/event.entity";

type CreateProps = Partial<CreateTicketDto> & {
  event: Event,
  user: User
  cpf: string,
  phone: string,
  address: string
}

export class TicketRepository {
  private repository: Repository<Ticket>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ticket);
  }

  async findByCpf(cpf: string): Promise<Ticket[]> {
    return this.repository.find({ where: { cpf } })
  }

async findByEvent(eventId: number): Promise<Ticket[]> {
  return this.repository.find({
    where: { event: { id: eventId } },
    relations: ['event'],
  });
}

  async save(ticket: Ticket): Promise<Ticket> {
    return this.repository.save(ticket);
  }

  async create(data: CreateProps): Promise<Ticket> {
    return this.repository.create(data);
  };

  async findByUserId(userId: number): Promise<Ticket[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['event', 'user'],
    });
  }
}