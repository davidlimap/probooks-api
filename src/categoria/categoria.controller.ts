import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaCategoriaDTO } from "./dto/CriaCategoria.dto";
import { ListaCategoriaDTO } from "./dto/ListaCategoria.dto";
import { CategoriaService } from "./categoria.service";

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  async criar(@Body() dadosCategoria: CriaCategoriaDTO) {

    const novaCategoria = await this.categoriaService.salvarCategoria(dadosCategoria);

    return {
      categoria: new ListaCategoriaDTO(novaCategoria.id, novaCategoria.nome),
      messagem: 'Categoria criada com sucesso',
    };
  }

  @Get()
  async listaCategoria() {
    return await this.categoriaService.listarCategorias();
  }
}