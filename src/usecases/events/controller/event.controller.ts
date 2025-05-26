import { Request, Response } from "express";
import { EventService } from "../service/event.service";

export class EventController {
  private eventService;

  constructor() {
    this.eventService = new EventService();
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.create(req.body);
      return res.status(201).json(event);
    } catch(err: any) {
      return res.status(400).json({ message: err.message });
    };
  };
};
