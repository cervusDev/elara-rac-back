# Etapa 1 - build com dependências
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json tsconfig.json ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2 - imagem final apenas com arquivos necessários
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copia apenas os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Define porta e comando de inicialização
EXPOSE 3000
CMD ["node", "dist/index.js"]