import { IsNotEmpty, IsOptional, IsDateString, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title!: string;

  @IsOptional()
  banner?: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  address!: string;

  @IsNotEmpty({ message: 'Data é obrigatória' })
  @IsDateString({}, { message: 'Data deve estar no formato ISO' })
  date!: string;

  @IsNotEmpty({ message: 'Hora é obrigatória' })
  time!: string;

  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @IsNumber({}, { message: 'Valor deve ser numérico' })
  @Min(0, { message: 'Valor deve ser zero ou positivo' })
  value!: number;

  @IsNotEmpty({ message: 'Quantidade máxima de participantes é obrigatória' })
  @IsNumber({}, { message: 'Quantidade deve ser numérica' })
  @IsPositive({ message: 'Quantidade deve ser positiva' })
  maxParticipants!: number;

  @IsNumber({}, { message: 'Quantidade deve ser numérica' })
  @IsPositive({ message: 'Quantidade deve ser positiva' })
  participants!: number;
}

export class UpdateEventDto  {}

