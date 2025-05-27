import dotenv from "dotenv";
import bodyParser from 'body-parser';

import { logger } from "./config/logger";

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import { AppDataSource } from "./config/database";
import express, { Request, Response } from "express";

import { healthRouter } from "./usecases/health/index";
import { userRouter } from "./usecases/user/routes/user.routes";
import { auhtRouter } from "./usecases/auth/routes/auth.routes";
import { eventRouter } from "./usecases/events/routes/event.routes";
import { ticketRouter } from "./usecases/ticket/routes/ticket.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("🌍 OK!");
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRouter);
app.use(auhtRouter);
app.use(eventRouter);
app.use(healthRouter);
app.use(ticketRouter);

AppDataSource.initialize().then(async () => {
  logger.info("Conectado ao banco de dados");
  
  app.listen(PORT, () => {
    logger.info("Servidor iniciado com sucesso!");
  });

}).catch(error => {
  logger.error("Erro ao conectar ao banco", error);
});
