import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
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
  async criarLivro(@Body() dadosLivro: CriaLivroDTO) {
    const novoLivro = await this.livroService.criarLivro(dadosLivro);

    return {
      livro: novoLivro,
      messagem: 'Livro criado com sucesso',
    };
  }

  @Get()
  async listaLivros() {
    const listaLivros = await this.livroService.listarLivrosSalvos();
    return listaLivros;
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