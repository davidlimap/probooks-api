import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaCategoriaDTO } from "./dto/CriaCategoria.dto";
import { CategoriaEntity } from "./categoria.entity";
import { v4 as uuid } from 'uuid';
import { ListaCategoriaDTO } from "./dto/ListaCategoria.dto";
import { CategoriaService } from "./categoria.service";

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  async criar(@Body() dadosCategoria: CriaCategoriaDTO) {
    const categoriaEntity: CategoriaEntity = new CategoriaEntity();
    categoriaEntity.id = uuid();
    categoriaEntity.nome = dadosCategoria.nome;

    this.categoriaService.salvarCategoria(categoriaEntity);

    return {
      categoria: new ListaCategoriaDTO(categoriaEntity.id, categoriaEntity.nome),
      messagem: 'Categoria criada com sucesso',
    };
  }

  @Get()
  async listaCategoria() {
    return await this.categoriaService.listarCategorias();
  }
}