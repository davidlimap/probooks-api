import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriaRepository } from "./categoria.repository";
import { CriaCategoriaDTO } from "./dto/CriaCategoria.dto";
import { CategoriaEntity } from "./categoria.entity";
import { v4 as uuid } from 'uuid';
import { ListaCategoriaDTO } from "./dto/ListaCategoria.dto";

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaRepository: CategoriaRepository) { }

  @Post()
  async criar(@Body() dadosCategoria: CriaCategoriaDTO) {
    const categoriaEntity: CategoriaEntity = new CategoriaEntity();
    categoriaEntity.id = uuid();
    categoriaEntity.nome = dadosCategoria.nome;

    this.categoriaRepository.salvar(categoriaEntity);

    return {
      categoria: new ListaCategoriaDTO(categoriaEntity.id, categoriaEntity.nome),
      messagem: 'Categoria criada com sucesso',
    };

  }

  @Get()
  async listaCategoria() {
    const categoriasSalvas = await this.categoriaRepository.listarCategorias();
    const categoriasLista = categoriasSalvas.map(
      (categoria) => new ListaCategoriaDTO(categoria.id, categoria.nome),
    );

    return categoriasLista;
  }
}