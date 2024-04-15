import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumberString, IsString, ValidateNested } from "class-validator";
import { EnderecoUsuarioDTO } from "src/autor/dto/EnderecoUsuario.dto";
import { EmailUnico } from "src/autor/validacoes/emailUnico.validator";

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'Nome do usuario não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  @IsNumberString(undefined, { message: 'O campo CPF deve conter apenas números.' })
  cpf: string;

  @IsNotEmpty({ message: 'Telefone não pode ser vazio.' })
  @IsNumberString(undefined, { message: 'O telefone deve conter apenas números.' })
  telefone: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => EnderecoUsuarioDTO)
  enderecos: EnderecoUsuarioDTO[];
}