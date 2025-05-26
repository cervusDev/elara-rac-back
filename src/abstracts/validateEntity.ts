import { validate } from 'class-validator';
import { logger } from '../config/logger';

export async function validateEntity<T>(entity: T): Promise<void> {
  const errors = await validate(entity as object);

  logger.error(JSON.stringify(errors));

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints ?? {}))
      .flat()
      .join(', ');

    throw new Error(`Erro de validação: ${messages}`);
  }
}