import { ILike } from 'typeorm';
import { Event } from "../entity/event.entity";
import { instanceToPlain } from 'class-transformer';
import { CreateEventDto } from "../entity/event.dto";
import { EventRepository } from "../repository/event.repository";
import { validateDeleteRequestParams } from "../../../abstracts/validateRequestBody";

interface FilterProps {
  id?: number;
  date?: string;
  title?: string;
}

export class EventService {
  private eventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  };

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    const event = await this.eventRepository.create(data);
    return this.eventRepository.save(event as Event);
  };

  async findAll(): Promise<Event[]> {
    return this.eventRepository.repository
      .createQueryBuilder('event')
      .where(`
      (event.date::text || ' ' || event.time::text)::timestamp > NOW()
    `)
      .getMany();
  };

  async findByFilter(filters: FilterProps): Promise<Event[]> {
    const where: any = {};

    if (filters.id !== undefined && filters.id !== null) {
      const parsedId = Number(filters.id);
      if (Number.isNaN(parsedId)) {
        throw new Error("O campo 'id' deve ser um número válido.");
      }
      where.id = parsedId;
    }

    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }

    if (filters.date) {
      where.date = filters.date;
    }


    if (Object.keys(where).length === 0) {
      return this.eventRepository.findAll();
    }


    return this.eventRepository.findByWhere(where);
  };

  public async update(id: number, data: any): Promise<Event> {
    const event = await this.eventRepository.findById(id) as Record<string, any>;

    if (!event) {
      throw new Error("Evento não encontrado.");
    };

    const now = new Date();
    const eventDateTime = new Date(`${event.date}T${event.time}`);

    const alreadyOccurred = eventDateTime < now;

    if (alreadyOccurred) {
      const blockedFields = ['date', 'time', 'valor'];
      for (const field of blockedFields) {
        if (data[field] !== undefined && data[field] !== event[field]) {
          throw new Error(`Não é permitido alterar o campo '${field}' de um evento que já ocorreu.`);
        }
      }
    }

    const plainData = instanceToPlain(data);
    const filterData = Object.fromEntries(
      Object.entries(plainData).filter(([_, v]) => v !== undefined)
    );

    const merge = await this.eventRepository.mergeData({ entity: event, filterData });
    return this.eventRepository.save(merge);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new Error('Evento não encontrado');
    };

    const validate = await validateDeleteRequestParams(event);

    if (!validate) {
      throw new Error('Não é possível excluir um evento com participantes');
    };

    await this.eventRepository.delete(id);
  };

  async viewDetail(id: number): Promise<Event> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new Error(`Não foi possível encontrar o evento com id ${id}`);
    };

    return event;
  }
};