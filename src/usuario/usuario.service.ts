import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEnderecoEntity } from "./usuario-endereco.entity";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) { }

  private async salvar(usuarioEntity: UsuarioEntity) {
    return await this.usuarioRepository.save(usuarioEntity);
  }

  private async buscarPorId(id: string) {
    const existeUsuario = await this.usuarioRepository.findOneBy({ id });

    if (!existeUsuario) {
      throw new Error('Usuario não existe');
    }
    return existeUsuario;
  }

  private async preencherUsuario(dadosUsuario: CriarUsuarioDTO) {
    const usuario = new UsuarioEntity()
    usuario.id = uuid();
    usuario.nome = dadosUsuario.nome;
    usuario.email = dadosUsuario.email;
    usuario.cpf = dadosUsuario.cpf;
    usuario.telefone = dadosUsuario.telefone;
    return usuario;
  }

  private async preencherEndereco(dadosUsuario: CriarUsuarioDTO) {
    const enderecos: UsuarioEnderecoEntity[] = [];

    for (const varEndereco of dadosUsuario.enderecos) {
      const endereco = new UsuarioEnderecoEntity()

      endereco.rua = varEndereco.rua;
      endereco.numero = varEndereco.numero;
      endereco.complemento = varEndereco.complemento;
      endereco.bairro = varEndereco.bairro;
      endereco.cidade = varEndereco.cidade;
      endereco.estado = varEndereco.estado;
      endereco.cep = varEndereco.cep;

      enderecos.push(endereco);
    };
    return enderecos;
  }

  async salvarUsuario(dadosUsuario: CriarUsuarioDTO) {
    const usuario = await this.preencherUsuario(dadosUsuario);
    const enderecos = await this.preencherEndereco(dadosUsuario);
    usuario.enderecos = enderecos;
    return await this.salvar(usuario);
  }

  async emailExiste(email: string) {
    return this.usuarioRepository.findOneBy({ email });
  }

}