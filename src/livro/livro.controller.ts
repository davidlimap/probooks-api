import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LivroRepository } from "./livro.repository";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
import { LivroEntity } from "./livro.entity";
import { v4 as uuid } from 'uuid';
import { ListaLivroDTO } from "./dto/ListaLivro.dto";
import { formatarData } from "src/utils/formatters";
import { FormatoData } from "src/enums/FormatoData";
import { AutorRepository } from "src/autor/autor.repository";
import { AtualizaLivroDTO } from "./dto/AtualizaLivro.dto";

@Controller('livro')
export class LivroController {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorRepository: AutorRepository
  ) { }

  @Post()
  async criar(@Body() dadosLivro: CriaLivroDTO) {
    const livroEntity: LivroEntity = new LivroEntity();

    livroEntity.id = uuid();
    livroEntity.titulo = dadosLivro.titulo;
    livroEntity.resumo = dadosLivro.resumo;
    livroEntity.sumario = dadosLivro.sumario;
    livroEntity.preco = dadosLivro.preco;
    livroEntity.numPaginas = dadosLivro.numPaginas;
    livroEntity.ISBN = dadosLivro.ISBN;
    livroEntity.dataPublicacao = dadosLivro.dataPublicacao;
    livroEntity.categoriaId = dadosLivro.categoriaId;
    livroEntity.autorId = dadosLivro.autorId;

    this.livroRepository.salvar(livroEntity);

    return {
      livro: new ListaLivroDTO(livroEntity.id, livroEntity.titulo, livroEntity.autorId, formatarData(livroEntity.dataPublicacao, FormatoData.PADRAO)),
      messagem: 'Livro criado com sucesso',
    };
  }

  @Get()
  async listaLivros() {
    const livrosSalvos = await this.livroRepository.listarLivros();
    const livrosLista = livrosSalvos.map(
      async (livro) => {
        console.log(livro);
        const autorLivro = await this.autorRepository.buscarAutorPorId(livro.autorId);
        new ListaLivroDTO(livro.id, livro.titulo, autorLivro.nome, formatarData(livro.dataPublicacao, FormatoData.PADRAO))
      });

    return livrosLista;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosLivro: AtualizaLivroDTO,
  ) {
    const livroAlterado = await this.livroRepository.atualiza(
      id,
      dadosLivro,
    );

    return {
      mensagem: 'Livro atualizado com sucesso',
      produto: livroAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const livroRemovido = await this.livroRepository.remove(id);

    return {
      mensagem: 'Livro removido com sucesso',
      produto: livroRemovido,
    };
  }
}