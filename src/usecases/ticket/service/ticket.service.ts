import { Ticket } from "../entity/ticket.entity";
import { CreateTicketDto } from "../entity/ticket.dto";
import { EventService } from "../../events/service/event.service";
import { TicketRepository } from "../repository/ticket.repository";
import { UserRepository } from "../../user/repository/user.repository";
import { EventRepository } from "../../events/repository/event.repository";
import { eventTimeout, limitTickesToSold, limitTicketsByCpf } from '../rules/ticket.rules';

interface findTicketByUserProps {
  used: Ticket[];
  available: Ticket[];
}

export class TicketService {
  private eventService;
  private userRepository;
  private eventRepository;
  private ticketRepository;

  constructor() {
    this.eventService = new EventService();
    this.userRepository = new UserRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
  };

  async create(data: CreateTicketDto): Promise<Ticket> {
    if (data.numberOfTickets > 3) {
      throw new Error("Não é possível comprar mais de 3 ingressos")
    };


    const user = await this.userRepository.findById(+data.userId);

    if (!user) {
      throw new Error(`Usuário com o id ${data.userId} não foi encontrado`);
    };

    const ticketsByCpf = await this.ticketRepository.findByCpf(user.cpf);
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
    };

    const updatedDataEvent = { participants: event.participants + 1 };
    const updateEvent = await this.eventService.update(event.id, updatedDataEvent);

    if (!updateEvent) {
      throw new Error("Não foi possível atualizar evento.");
    };

    if (updateEvent.participants >= updateEvent.maxParticipants) {
      throw new Error("O evento atingiu o número máximo de participantes.");
    };

    const payload = { ...data, cpf: user.cpf, user, event };
    const arrayFrom = Array.from({ length: data.numberOfTickets }).map(async () => {});
    arrayFrom.forEach(async () => {
      const createdTicket = await this.ticketRepository.create(payload);
  
      await this.ticketRepository.save(createdTicket);
    })
    

    return {} as Ticket;
  };

  async findTicketByUser(userId: number): Promise<findTicketByUserProps> {
    const tickets = await this.ticketRepository.findByUserId(userId);

    const now = new Date();

    const available = tickets.filter(ticket => {
      const eventDate = new Date(`${ticket.event.date}T${ticket.event.time.padEnd(8, ':00')}`);
      return eventDate > now;
    });

    const used = tickets.filter(ticket => {
      const eventDate = new Date(`${ticket.event.date}T${ticket.event.time.padEnd(8, ':00')}`);
      return eventDate <= now;
    });

    return { used, available };
  };
};