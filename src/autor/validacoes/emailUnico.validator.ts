import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AutorRepository } from '../autor.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private readonly autorRepository: AutorRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const autorComEmailExiste = await this.autorRepository.emailExiste(value);
    return !autorComEmailExiste;
  }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
