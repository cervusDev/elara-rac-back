import {
  IsNotEmpty,
  IsString,
  Matches,
  IsUUID
} from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'O nome do participante é obrigatório.' })
  @IsString({ message: 'O nome do participante deve ser um texto.' })
  nomeParticipante!: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Matches(/^\d{11}$/, {
    message: 'O CPF deve conter exatamente 11 dígitos numéricos.',
  })
  cpf!: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Matches(/^\d{10,11}$/, {
    message: 'O telefone deve conter 10 ou 11 dígitos numéricos.',
  })
  telefone!: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @IsString({ message: 'O endereço deve ser um texto.' })
  endereco!: string;

  @IsNotEmpty({ message: 'O evento é obrigatório.' })
  @IsUUID('4', { message: 'ID do evento inválido.' })  
  eventId!: string;

  @IsNotEmpty({ message: 'O usuário é obrigatório.' })
  @IsUUID('4', { message: 'ID do usuário inválido.' })
  userId!: string;
}
