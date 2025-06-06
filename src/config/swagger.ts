import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Elara',
      version: '1.0.0',
      description: 'Documentação da API do Software Elara',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: [
    'src/usecases/user/routes/*.ts',
    'src/usecases/auth/routes/*.ts',
    'src/usecases/events/routes/*.ts',
    'src/usecases/ticket/routes/*.ts',
  ]
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
