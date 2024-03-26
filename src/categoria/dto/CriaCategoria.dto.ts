import { IsNotEmpty, IsString } from "class-validator";

export class CriaCategoriaDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode ser vazio.' })
  nome: string;
}