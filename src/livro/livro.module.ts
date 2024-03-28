import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroRepository } from './livro.repository';
import { ISBNUnicoValidator } from './validators/isbnUnico.validator';
import { AutorModule } from 'src/autor/autor.module';
import { AutorRepository } from 'src/autor/autor.repository';

@Module({
  imports: [AutorModule],
  controllers: [LivroController],
  providers: [LivroRepository, AutorRepository, ISBNUnicoValidator],
})
export class LivroModule { }