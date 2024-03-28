import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';
import { LivroModule } from './livro/livro.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [AutorModule, LivroModule, CategoriaModule],
})
export class AppModule { }
