import express from 'express';
import { UserController } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
  const userController = new UserController();
  await userController.list(req, res);
});

export { userRouter };