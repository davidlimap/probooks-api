import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
import { LivroEntity } from "./livro.entity";
import { v4 as uuid } from 'uuid';
import { ListaLivroDTO } from "./dto/ListaLivro.dto";
import { formatarData } from "src/utils/formatters";
import { FormatoData } from "src/enums/FormatoData";
import { AtualizaLivroDTO } from "./dto/AtualizaLivro.dto";
import { AutorService } from "src/autor/autor.service";
import { CategoriaService } from "src/categoria/categoria.service";
import { LivroService } from "./livro.service";

@Controller('livro')
export class LivroController {
  constructor(
    private readonly livroService: LivroService,
    private readonly categoriaService: CategoriaService,
    private readonly autorService: AutorService
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

    const categoriaEntity = await this.categoriaService.buscarCategoriaPorId(dadosLivro.categoriaId);
    livroEntity.categoria = categoriaEntity;

    const autorEntity = await this.autorService.buscarAutorPorId(dadosLivro.autorId);
    livroEntity.autor = autorEntity;

    this.livroService.salvarLivro(livroEntity);

    return {
      livro: new ListaLivroDTO(livroEntity.id, livroEntity.titulo, autorEntity.nome, formatarData(livroEntity.dataPublicacao, FormatoData.PADRAO)),
      messagem: 'Livro criado com sucesso',
    };
  }

  @Get()
  async listaLivros() {
    const livrosSalvos = await this.livroService.listarLivros();
    const livrosLista = livrosSalvos.map(
      async (livro) => {
        const autorLivro = await this.autorService.buscarAutorPorId(livro.autor.id);
        new ListaLivroDTO(livro.id, livro.titulo, autorLivro.nome, formatarData(livro.dataPublicacao, FormatoData.PADRAO))
      });

    return livrosLista;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosLivro: AtualizaLivroDTO,
  ) {
    const livroAlterado = await this.livroService.atualizarLivro(
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
    const livroRemovido = await this.livroService.removerLivro(id);

    return {
      mensagem: 'Livro removido com sucesso',
      produto: livroRemovido,
    };
  }
}