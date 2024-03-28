import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LivroRepository } from '../livro.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class ISBNUnicoValidator implements ValidatorConstraintInterface {
  constructor(private readonly livroRepository: LivroRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const livroComISBNExiste = await this.livroRepository.existeISBN(value);
    return !livroComISBNExiste;
  }
}

export const ISBNUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: ISBNUnicoValidator,
    });
  };
};
