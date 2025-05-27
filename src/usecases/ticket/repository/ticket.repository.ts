import { Repository } from "typeorm";
import { Ticket } from "../entity/ticket.entity";
import { AppDataSource } from "../../../config/database";
import { CreateTicketDto } from "../entity/ticket.dto";

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

  async create(data: CreateTicketDto): Promise<Ticket> {
    return this.repository.create(data);
  };
}