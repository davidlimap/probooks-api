import { IsNotEmpty, IsString } from "class-validator";

export class CriaCategoriaDTO {
  @IsNotEmpty({ message: 'ID não pode ser vazio.' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode ser vazio.' })
  nome: string;
}