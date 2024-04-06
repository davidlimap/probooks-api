import { Body, Controller, Post } from "@nestjs/common";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async criarUsuario(@Body() dadosUsuario: CriarUsuarioDTO) {

    this.usuarioService.salvarUsuario(dadosUsuario);
  }
}
