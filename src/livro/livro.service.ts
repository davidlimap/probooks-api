import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LivroEntity } from "./livro.entity";
import { Repository } from "typeorm";

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>
  ) { }

  private async salvar(livroEntity: LivroEntity) {
    return await this.livroRepository.save(livroEntity);
  }

  private async buscarPorId(id: string) {
    const existeLivro = await this.livroRepository.findOneBy({ id });

    if (!existeLivro) {
      throw new Error('Livro não existe');
    }
    return existeLivro;
  }

  async salvarLivro(livroEntity: LivroEntity) {
    return await this.salvar(livroEntity);
  }

  async listarLivros() {
    return await this.livroRepository.find();
  }

  async buscarLivroPorId(id: string) {
    const livro = await this.buscarPorId(id);
    return livro;
  }

  async existeISBN(ISBN: string) {
    const existeLivroIsbn = await this.livroRepository.findOneBy({ ISBN });
    console.log(existeLivroIsbn);
    return existeLivroIsbn !== null;
  }

  async atualizarLivro(id: string, dadosLivro: Partial<LivroEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const livro = await this.buscarPorId(id);
    Object.entries(dadosLivro).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      livro[chave] = valor;
    });

    return await this.salvar(livro);
  }

  async removerLivro(id: string) {
    return await this.livroRepository.delete(id);
  }
}