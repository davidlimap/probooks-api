import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { EmailUnico } from "../validacoes/emailUnico.validator";
export class CriaAutorDTO {
  @IsString()
  @IsNotEmpty({ message: 'A campo nome não pode ser vazio.' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsNotEmpty({ message: 'O campo biografia não pode ser vazio.' })
  @MinLength(100, { message: 'A biografia precisa ter pelo menos 100 caracteres' })
  @MaxLength(500, { message: 'A biografia precisa ter no máximo 500 caracteres' })
  @IsString()
  biografia: string;
}