import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AutorEntity } from "./autor.entity";
import { v4 as uuid } from 'uuid';
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { CriaAutorDTO } from "./dto/CriaAutor.dto";
import { FormatoData } from "src/enums/FormatoData";
import { formatarData } from "src/utils/formatters";
import { AutorService } from "./autor.service";

@Controller('autor')
export class AutorController {
  constructor(
    private readonly autorService: AutorService
  ) { }

  @Post()
  async criar(@Body() dadosAutor: CriaAutorDTO) {
    const autorEntity = new AutorEntity();

    autorEntity.id = uuid();
    autorEntity.nome = dadosAutor.nome;
    autorEntity.email = dadosAutor.email;
    autorEntity.biografia = dadosAutor.biografia;
    autorEntity.dataCadastro = new Date();

    this.autorService.salvarAutor(autorEntity);

    return {
      usuario: new ListaAutorDTO(autorEntity.id, autorEntity.nome, formatarData(autorEntity.dataCadastro, FormatoData.PADRAO)),
      messagem: 'Autor criado com sucesso',
    };
  }

  @Get()
  async listAutores() {
    const autoresSalvos = await this.autorService.listarAutores();
    return autoresSalvos;
  }

  @Get('/:id')
  async buscaPorId(@Param('id') id: string) {
    return await this.autorService.buscarAutorPorId(id);
  }
}