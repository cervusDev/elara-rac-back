import { Router } from "express";
import { EventController } from "../controller/event.controller";
import { authMiddleware } from "../../auth/middleware/auth.middleware";

const eventRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: API para eventos
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - address
 *               - date
 *               - time
 *               - value
 *               - maxParticipants
 *             properties:
 *               title:
 *                 type: string
 *                 example: Festa de lançamento
 *               banner:
 *                 type: string
 *                 example: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzLkvfogUHy3aUNxZaluj960QfL2cXlJ8Tag&s
 *               address:
 *                  type: string
 *                  example: Odilon prado Cassetari 2707
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-01T19:00:00Z
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: 10:30
 *               value:
 *                 type: number
 *                 format: number
 *                 example: 125.00
 *               maxParticipants:
 *                 type: number
 *                 format: number
 *                 example: 30
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno no servidor
 * 
 */

eventRouter.post("/event", authMiddleware, (req, res) => {
  const eventController = new EventController();
  eventController.create(req, res)
});

export { eventRouter };