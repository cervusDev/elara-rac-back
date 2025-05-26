import { Event } from "../entity/event.entity";
import { CreateEventDto } from "../entity/event.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";

type FilterProps = FindOptionsWhere<Event> | FindOptionsWhere<Event>[];

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
  };

  async findAll(): Promise<Event[]> {
    return this.repository.find();
  };

  async findByWhere(where: FilterProps) {
    return this.repository.findBy(where);
  };

  async findById(id: any): Promise<Event | null> {
    return this.repository.findOneBy({ id });
  };

  async mergeData({ entity, filterData }: { entity: any, filterData: any }) {
    return this.repository.merge(entity, filterData)
  }
};
