import { Request, Response } from "express";
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
  };

  async findTicketsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.userId);
      const result = await this.ticketService.findTicketByUser(userId);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    };
  };
};
