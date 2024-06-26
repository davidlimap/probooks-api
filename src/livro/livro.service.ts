import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LivroEntity } from "./livro.entity";
import { Repository } from "typeorm";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
import { CategoriaService } from "src/categoria/categoria.service";
import { AutorService } from "src/autor/autor.service";
import { ListaLivroDTO } from "./dto/ListaLivro.dto";
import { formatarData } from "src/utils/formatters";
import { FormatoData } from "src/enums/FormatoData";

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
    private readonly categoriaService: CategoriaService,
    private readonly autorService: AutorService
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

  async criarLivro(dadosLivro: CriaLivroDTO) {
    const livroEntity: LivroEntity = new LivroEntity();
    livroEntity.titulo = dadosLivro.titulo;
    livroEntity.resumo = dadosLivro.resumo;
    livroEntity.sumario = dadosLivro.sumario;
    livroEntity.preco = dadosLivro.preco;
    livroEntity.numPaginas = dadosLivro.numPaginas;
    livroEntity.ISBN = dadosLivro.ISBN;
    livroEntity.dataPublicacao = dadosLivro.dataPublicacao;
    livroEntity.quantidadeDisponivel = dadosLivro.quantidadeDisponivel;

    const categoriaEntity = await this.categoriaService.buscarCategoriaPorId(dadosLivro.categoriaId);
    livroEntity.categoria = categoriaEntity;

    const autorEntity = await this.autorService.buscarAutorPorId(dadosLivro.autorId);
    livroEntity.autor = autorEntity;

    this.salvarLivro(livroEntity);

    return new ListaLivroDTO(livroEntity.id, livroEntity.titulo, autorEntity.nome, formatarData(livroEntity.dataPublicacao, FormatoData.PADRAO));
  }

  async listarLivrosSalvos() {
    const livrosSalvos = await this.listarLivros();
    const livrosLista = livrosSalvos.map(
      async (livro) => {
        const autorLivro = await this.autorService.buscarAutorPorId(livro.autor.id);
        new ListaLivroDTO(livro.id, livro.titulo, autorLivro.nome, formatarData(livro.dataPublicacao, FormatoData.PADRAO))
      });

    return livrosLista;
  }
}