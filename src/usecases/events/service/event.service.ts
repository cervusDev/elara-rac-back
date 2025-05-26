import { Event } from "../entity/event.entity";
import { CreateEventDto } from "../entity/event.dto";
import { EventRepository } from "../repository/event.repository";
import { validateRequestBody } from "../../../abstracts/validateRequestBody";

export class EventService {
  private eventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  };

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    await validateRequestBody({ dto: CreateEventDto, body: data });
    
    const event = await this.eventRepository.create(data);
    
    return this.eventRepository.save(event as Event);
  }
}