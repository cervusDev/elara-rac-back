import { Ticket } from "../entity/ticket.entity";
import { CreateTicketDto } from "../entity/ticket.dto";
import { TicketRepository } from "../repository/ticket.repository";
import { UserRepository } from "../../user/repository/user.repository";
import { EventRepository } from "../../events/repository/event.repository";
import { eventTimeout, limitTickesToSold, limitTicketsByCpf } from '../rules/ticket.rules';

export class TicketService {
  private userRepository;
  private eventRepository;
  private ticketRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
  };

  public async create(data: CreateTicketDto): Promise<Ticket> {
    const user = await this.userRepository.findById(+data.userId);

    if (!user) {
      throw new Error(`Usuário com o id ${data.userId} não foi encontrado`);
    };

    const ticketsByCpf = await this.ticketRepository.findByCpf(data.cpf);
    const isAllowedBuyToCpf = limitTicketsByCpf(ticketsByCpf);

    if (!isAllowedBuyToCpf) {
      throw new Error('CPF já atingiu o limite de 3 ingressos para este evento.');
    };

    const event = await this.eventRepository.findById(data.eventId);

    if (!event) {
      throw new Error(`Evento com o id ${data.eventId} não encontrado.`);
    };

    const eventDidNotHappen = eventTimeout(event);

    if (!eventDidNotHappen) {
      throw new Error('Não é possível comprar ingressos para eventos que já ocorreram.');
    };
    
    const ticketsByEvent = await this.ticketRepository.findByEvent(+data.eventId);
    const isAllowedBuyToTotalSold = limitTickesToSold(ticketsByEvent, event);

    if (!isAllowedBuyToTotalSold) {
      throw new Error('Limite de ingressos vendidos para este evento já foi atingido.');
    }

    const createdTicket = await this.ticketRepository.create(data);
    
    const ticket = await this.ticketRepository.save(createdTicket);

    return ticket;
  };
};