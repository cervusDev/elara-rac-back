import { Request, Response } from "express";
import { logger } from "../../../config/logger";
import { TicketService } from "../service/ticket.service";

export class TicketController {
  private ticketService;

  constructor() {
    this.ticketService = new TicketService();
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.ticketService.create(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Erro interno do servidor.' });
    };
  }
};
