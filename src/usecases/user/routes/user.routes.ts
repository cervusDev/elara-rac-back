import express from 'express';
import { UserController } from '../controller/user.controller';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints relacionados a usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   passw:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */

userRouter.get('/users', async (req, res) => {
  const userController = new UserController();
  await userController.list(req, res);
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - passw
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               passw:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requisição inválida
 */
userRouter.post('/user', async (req, res) => {
  const userController = new UserController();
  await userController.create(req, res);
})

export { userRouter };