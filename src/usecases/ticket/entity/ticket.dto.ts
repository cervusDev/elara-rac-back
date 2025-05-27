import {
  Min,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateTicketDto {

  @IsNotEmpty({ message: 'O evento é obrigatório.' })
  @IsInt({ message: 'O ID do evento deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do evento deve ser maior que zero.' })
  eventId!: number;

  @IsNotEmpty({ message: 'O usuário é obrigatório.' })
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do usuário deve ser maior que zero.' })
  userId!: number;
}
