import express from "express";

const PORT = 3000;
const app = express();

// Middleware para JSON
app.use(express.json());

// Rota padrão
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
