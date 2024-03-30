import { Injectable } from "@nestjs/common";
import { AutorEntity } from "./autor.entity";

@Injectable()
export class AutorRepository {
  private autores: AutorEntity[] = [];

  async salvar(dadosAutor: AutorEntity) {
    this.autores.push(dadosAutor);
    return dadosAutor;
  }

  async listarAutores() {
    return this.autores;
  }

  async buscarAutorPorId(id: string) {
    const autor = await this.buscaPorId(id);
    return autor;
  }

  private async buscaPorId(id: string) {
    const existeAutor = this.autores.find((autor) => autor.id === id);

    if (!existeAutor) {
      throw new Error('Autor não existe');
    }

    return existeAutor;
  }

  async atualiza(id: string, dadosAutor: Partial<AutorEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const autor = await this.buscaPorId(id);
    Object.entries(dadosAutor).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      autor[chave] = valor;
    });

    return autor;
  }

  async remove(id: string) {
    const autorRemovido = await this.buscaPorId(id);
    this.autores = this.autores.filter((autor) => autor.id !== id);
    return autorRemovido;
  }

  async emailExiste(email: string) {
    const possivelUsuario = this.autores.find(
      (autor) => autor.email === email,
    );

    return possivelUsuario !== undefined;
  }

}