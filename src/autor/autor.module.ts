import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller';
import { AutorRepository } from './autor.repository';
import { EmailUnicoValidator } from './validacoes/emailUnico.validator';

@Module({
  controllers: [AutorController],
  providers: [AutorRepository, EmailUnicoValidator],
})
export class AutorModule { }