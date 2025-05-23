import express from 'express';

const healthRouter = express.Router();
healthRouter.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Express está funcionando!',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };
