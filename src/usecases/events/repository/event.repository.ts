import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { Event } from "../entity/event.entity";
import { CreateEventDto } from "../entity/event.dto";

export class EventRepository {
  private repository: Repository<Event>;

  constructor() {
    this.repository = AppDataSource.getRepository(Event);
  };

  async create(data: CreateEventDto): Promise<CreateEventDto> {
    return this.repository.create(data);
  };

  async save(data: Event): Promise<Event> {
    return this.repository.save(data);
  }

}
