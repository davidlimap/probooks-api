import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaRepository } from './categoria.repository';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaRepository],
})
export class CategoriaModule { }