import { Router } from "express";
import { TicketController } from "../controller/ticket.controller";
import { authMiddleware } from "../../auth/middleware/auth.middleware";

const ticketRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API para Tickets
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         cpf:
 *           type: string
 *           example: "123.456.789-00"
 *         telefone:
 *           type: string
 *           example: "+55 21 99999-8888"
 *         endereco:
 *           type: string
 *           example: "Rua das Flores, 123, Centro"
 *         userId:
 *           type: integer
 *           example: 1
 *         eventId:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         status:
 *           type: string
 *           enum: [disponivel, indisponivel, utilizado]
 *           example: disponivel
 */

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Compra de ingresso para um evento
 *     tags:
 *       - Ingressos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ingresso criado com sucesso.
 *       400:
 *         description: Regras de negócio não atendidas ou dados inválidos.
 */
ticketRouter.post('/ticket', authMiddleware, (req, res) => {
  const controller = new TicketController();
  controller.create(req, res);
});

/**
 * @swagger
 * /tickets/{userId}:
 *   get:
 *     summary: Lista todos os ingressos comprados por um usuário
 *     tags: [Ingressos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de ingressos divididos em disponíveis e utilizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 *                 used:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 */
ticketRouter.get('/tickets/:userId', authMiddleware, (req, res) => {
  const controller = new TicketController();
  controller.findTicketsByUser(req, res);
});


export { ticketRouter };