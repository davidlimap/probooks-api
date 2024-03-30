import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AutorEntity } from "./autor.entity";
import { AutorRepository } from "./autor.repository";
import { v4 as uuid } from 'uuid';
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { CriaAutorDTO } from "./dto/CriaAutor.dto";
import { FormatoData } from "src/enums/FormatoData";
import { formatarData } from "src/utils/formatters";

@Controller('autor')
export class AutorController {
  constructor(private readonly autorRepository: AutorRepository) { }

  @Post()
  async criar(@Body() dadosAutor: CriaAutorDTO) {
    const autorEntity = new AutorEntity();

    autorEntity.id = uuid();
    autorEntity.nome = dadosAutor.nome;
    autorEntity.email = dadosAutor.email;
    autorEntity.biografia = dadosAutor.biografia;
    autorEntity.dataCadastro = new Date();

    this.autorRepository.salvar(autorEntity);

    return {
      usuario: new ListaAutorDTO(autorEntity.id, autorEntity.nome, formatarData(autorEntity.dataCadastro, FormatoData.PADRAO)),
      messagem: 'Autor criado com sucesso',
    };

  }

  @Get()
  async listAutores() {
    const autoresSalvos = await this.autorRepository.listarAutores();
    const autoresLista = autoresSalvos.map(
      (autor) => new ListaAutorDTO(autor.id, autor.nome, formatarData(autor.dataCadastro, FormatoData.PADRAO)),
    );

    return autoresLista;
  }

  @Get('/:id')
  async buscaPorId(@Param('id') id: string) {
    const autor = await this.autorRepository.buscarAutorPorId(id);
    return autor;
  }
}