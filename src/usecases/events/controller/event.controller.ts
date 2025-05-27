import { Request, Response } from "express";
import { EventService } from "../service/event.service";
import { UpdateEventDto } from "../entity/event.dto";
import { logger } from "../../../config/logger";

export class EventController {
  private eventService;

  constructor() {
    this.eventService = new EventService();
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.create(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Erro interno do servidor.' });
    };
  };

  async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const events = await this.eventService.findAll();
      return res.status(200).json(events);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Erro interno do servidor.' });
    };
  };

  async listByFilter(req: Request, res: Response): Promise<Response> {
    try {
      const { id, title, date } = req.query;

      const filters = {
        id: id ? Number(id) : undefined,
        title: title?.toString(),
        date: date?.toString()
      };

      const events = await this.eventService.findByFilter(filters);
      return res.status(200).json(events);
    } catch (err: any) {
      return res.status(500).json({ message: err.message || 'Erro interno do servidor.' });
    };
  };

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const updateData: UpdateEventDto = req.body;

      const updated = await this.eventService.update(id, updateData);
      return res.status(200).json(updated);
    } catch (err: any) {
      return res.status(400).json({ message: err.message || 'Erro interno do servidor' });
    };
  };

  async delete(req: Request, res: Response): Promise<Response> {
    logger.error(req.params.id);

    try {
      const id = Number(req.params.id);
      await this.eventService.deleteEvent(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor' });
    }
  }
};
