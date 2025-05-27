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
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
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