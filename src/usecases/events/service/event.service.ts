import { ILike } from 'typeorm';
import { ValidatorRules } from '../rules';
import { Event } from "../entity/event.entity";
import { instanceToPlain } from 'class-transformer';
import { EventRepository } from "../repository/event.repository";
import { CreateEventDto, UpdateEventDto } from "../entity/event.dto";
import { validateDeleteRequestParams, validateUpdateRequestBody } from "../../../abstracts/validateRequestBody";

interface FilterProps {
  id?: number;
  date?: string;
  title?: string;
}

export class EventService {
  private validator;
  private eventRepository;

  constructor() {
    this.validator = new ValidatorRules();
    this.eventRepository = new EventRepository();
  };

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    await validateUpdateRequestBody({ dto: CreateEventDto, body: data });
    const event = await this.eventRepository.create(data);
    return this.eventRepository.save(event as Event);
  };

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  };

  async findByFilter(filters: FilterProps): Promise<Event[]> {
    const where: any = {};

    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }

    if (filters.date) {
      where.date = filters.date;
    }

    return this.eventRepository.findByWhere(where);
  };

  async update(id: number, data: UpdateEventDto): Promise<UpdateEventDto> {
    const event = await this.eventRepository.findById(id);

    const { message, status } = await this.validator.updateValues(event);
    
    if (!status) {
      throw new Error(message);
    }

    if (!event) {
      throw new Error("Evento não encontrado.");
    };

    const plainData = instanceToPlain(data);
    const filterData = Object.fromEntries(
      Object.entries(plainData).filter(([_, v]) => v !== undefined)
    );

    const merge = await this.eventRepository.mergeData({ entity: event, filterData });
    return this.eventRepository.save(merge);
  }

  async deleteEvent(id:number): Promise<void> {
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

  async viewDetail(id:number): Promise<Event> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new Error(`Não foi possível encontrar o evento com id ${id}`);
    };

    return event;
  }
};