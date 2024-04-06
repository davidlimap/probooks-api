import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaEntity } from "./categoria.entity";
import { Repository } from "typeorm";
import { ListaCategoriaDTO } from "./dto/ListaCategoria.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>
  ) { }

  private async buscaPorId(id: string) {
    const existeCategoria = await this.categoriaRepository.findOneBy({ id });

    if (!existeCategoria) {
      throw new Error('Categoria não existe');
    }
    return existeCategoria;
  }

  async listarCategorias() {
    const categoriasSalvas: CategoriaEntity[] = await this.categoriaRepository.find();

    const categoriasLista = categoriasSalvas.map(
      (categoria) => new ListaCategoriaDTO(categoria.id, categoria.nome)
    );

    return categoriasLista;
  }

  async salvarCategoria(categoriaEntity: CategoriaEntity) {
    return await this.categoriaRepository.save(categoriaEntity);
  }

  async buscarCategoriaPorId(id: string) {
    const categoria = await this.buscaPorId(id);
    return categoria;
  }

}