import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { logger } from "./config/logger";
import { AppDataSource } from "./config/database";
import express, { Request, Response } from "express";

// ROUTES IMPORTS
import { healthRouter } from "./usecases/health/index";
import { userRouter } from "./usecases/user/routes/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// INTEGRATION ROUTES/EXPRESS
app.get("/", (_req: Request, res: Response) => {
  res.send("🌍 OK!");
});

app.use(userRouter);
app.use(healthRouter);

AppDataSource.initialize().then(async () => {
  logger.info("Conectado ao banco de dados");
  
  app.listen(PORT, () => {
    logger.info("Servidor iniciado com sucesso!");
  });

}).catch(error => {
  logger.error("Erro ao conectar ao banco", error);
});
