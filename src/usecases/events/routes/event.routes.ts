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

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Erro interno no servidor
 */
eventRouter.get("/events", authMiddleware, (req, res) => {
  const eventController = new EventController();
  eventController.findAll(req, res)
})

/**
 * @swagger
 * /events/filter:
 *   get:
 *     summary: Filtra eventos por ID, título ou data
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID do evento
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Título do evento
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Data do evento
 *     responses:
 *       200:
 *         description: Lista de eventos filtrados
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
eventRouter.get("/events/filter", authMiddleware, (req, res) => {
  const eventController = new EventController();
  eventController.listByFilter(req, res)
});

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Atualiza um evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do evento
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Novo título
 *               address:
 *                 type: string
 *                 example: Rua Atualizada, 123
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-10
 *               time:
 *                 type: string
 *                 example: "14:00"
 *               value:
 *                 type: number
 *                 example: 150
 *               maxParticipants:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Evento não encontrado
 */
eventRouter.patch('/events/:id', authMiddleware, (req, res) => {
  const controller = new EventController();
  controller.update(req, res);
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Exclui um evento
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       204:
 *         description: Evento excluído com sucesso
 *       400:
 *         description: Não é possível excluir evento com participantes
 *       404:
 *         description: Evento não encontrado
 */
eventRouter.delete('/events/:id', authMiddleware, (req, res) => {
  const controller = new EventController();
  controller.delete(req, res);
});

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Lista um único evento para visualização dos detalhes
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de um únicoe vento retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Erro interno no servidor
 */
eventRouter.get('/event/:id', authMiddleware, (req, res) => {
  const controller = new EventController();
  controller.detail(req, res);
})

export { eventRouter };