import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

interface ValidateProps {
  dto: any;
  body: any;
}

export async function validateRequestBody({ dto, body }: ValidateProps) {
  const dtoInstance = plainToInstance(dto, body);

  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    throw new Error('Erro de validação');
  }

  return dtoInstance;
}