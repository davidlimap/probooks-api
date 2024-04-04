import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { AutorEntity } from "./autor.entity";
import { Repository } from "typeorm";
import { FormatoData } from "src/enums/FormatoData";
import { formatarData } from "src/utils/formatters";

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private readonly autorRepository: Repository<AutorEntity>
  ) { }

  private async salvar(autorEntity: AutorEntity) {
    await this.autorRepository.save(autorEntity);
  }

  private async buscaPorId(id: string) {
    const existeAutor = await this.autorRepository.findOneBy({ id });

    if (!existeAutor) {
      throw new Error('Autor não existe');
    }
    return existeAutor;
  }

  async salvarAutor(autorEntity: AutorEntity) {
    this.salvar(autorEntity);
  }

  async listaAutores() {
    const autoresSalvos = await this.autorRepository.find();
    const autoresLista = autoresSalvos.map(
      (autor) => new ListaAutorDTO(autor.id, autor.nome, formatarData(autor.dataCadastro, FormatoData.PADRAO)),
    );

    return autoresLista;
  }

  async buscarAutorPorId(id: string) {
    const autor = await this.buscaPorId(id);
    return autor;
  }

  async atualizaAutor(id: string, dadosAutor: Partial<AutorEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const autor = await this.buscaPorId(id);
    Object.entries(dadosAutor).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      autor[chave] = valor;
    });

    return await this.salvar(autor);
  }

  async emailExiste(email: string) {
    return this.autorRepository.findOneBy({ email });
  }
}