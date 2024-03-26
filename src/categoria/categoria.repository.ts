import { Injectable } from "@nestjs/common";
import { CategoriaEntity } from "./categoria.entity";

@Injectable()
export class CategoriaRepository {
  private categorias: CategoriaEntity[] = [];

  async listarCategorias() {
    return this.categorias;
  }

  async salvar(dadosCategoria: CategoriaEntity) {
    this.categorias.push(dadosCategoria);
    return dadosCategoria;
  }

}