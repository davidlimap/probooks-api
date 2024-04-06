import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { ISBNUnicoValidator } from './validators/isbnUnico.validator';
import { AutorService } from 'src/autor/autor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorEntity } from 'src/autor/autor.entity';
import { LivroService } from './livro.service';
import { LivroEntity } from './livro.entity';
import { CategoriaService } from 'src/categoria/categoria.service';
import { CategoriaEntity } from 'src/categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity, LivroEntity, CategoriaEntity])],
  controllers: [LivroController],
  providers: [LivroService, AutorService, CategoriaService, ISBNUnicoValidator],
})
export class LivroModule { }