import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { CriaAutorDTO } from "./dto/CriaAutor.dto";
import { FormatoData } from "../enums/FormatoData";
import { formatarData } from "../utils/formatters";
import { AutorService } from "./autor.service";

@Controller('autor')
export class AutorController {
  constructor(
    private readonly autorService: AutorService
  ) { }

  @Post()
  async criar(@Body() dadosAutor: CriaAutorDTO) {

    const autorSalvo = await this.autorService.salvarAutor(dadosAutor);

    return {
      usuario: new ListaAutorDTO(autorSalvo.id, autorSalvo.nome, formatarData(autorSalvo.dataCadastro, FormatoData.PADRAO)),
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