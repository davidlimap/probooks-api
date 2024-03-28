import { Injectable } from "@nestjs/common";
import { LivroEntity } from "./livro.entity";

@Injectable()
export class LivroRepository {
  private livros: LivroEntity[] = [];

  async salvar(dadosLivro: LivroEntity) {
    this.livros.push(dadosLivro);
    return dadosLivro;
  }

  async listarLivros() {
    return this.livros;
  }

  async existeISBN(ISBN: string) {
    const possivelLivro = this.livros.find(
      (livro) => livro.ISBN === ISBN,
    );

    return possivelLivro !== undefined;
  }

  private buscaPorId(id: string) {
    const existeLivro = this.livros.find((livro) => livro.id === id);

    if (!existeLivro) {
      throw new Error('Livro não existe');
    }

    return existeLivro;
  }

  async atualiza(id: string, dadosLivro: Partial<LivroEntity>) {
    const dadosNaoAtualizaveis = ['id'];
    const livro = this.buscaPorId(id);
    Object.entries(dadosLivro).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      livro[chave] = valor;
    });

    return livro;
  }

  async remove(id: string) {
    const livroRemovido = this.buscaPorId(id);
    this.livros = this.livros.filter((produto) => produto.id !== id);
    return livroRemovido;
  }
}