import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from '../enums/status-pedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { LivroEntity } from '../livro/livro.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
  ) { }

  private async buscarUsuarioPorId(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  private trataDadosPedido(dadosPedido: CriaPedidoDTO, livros: LivroEntity[]) {
    dadosPedido.itensPedido.forEach((itemPedido) => {
      const livro = livros.find((livro) => livro.id === itemPedido.livroId);
      if (!livro) {
        throw new NotFoundException(`O livro com o id ${itemPedido.livroId} não foi encontrado`);
      }

      if (itemPedido.quantidade > livro.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior que a quantidade disponível (${livro.quantidadeDisponivel}) para o livro ${livro.titulo}`);
      }

    })
  }



  async cadastrarPedido(usuarioId: string, dadosPedido: CriaPedidoDTO): Promise<PedidoEntity> {
    const usuario = await this.buscarUsuarioPorId(usuarioId);

    const livrosIds = dadosPedido.itensPedido.map((itemPedido) => itemPedido.livroId);
    const livros = await this.livroRepository.findBy({ id: In(livrosIds) });

    this.trataDadosPedido(dadosPedido, livros);

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const itensPedido = dadosPedido.itensPedido.map((itemPedido) => {
      const livro = livros.find((livro) => livro.id === itemPedido.livroId);
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.livro = livro!;
      itemPedidoEntity.precoVenda = livro!.preco;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.livro.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedido.reduce((total, item) => { return total + item.precoVenda * item.quantidade }, 0);

    pedidoEntity.itensPedido = itensPedido;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoSalvo = await this.pedidoRepository.save(pedidoEntity);
    return pedidoSalvo;
  }

  async obtemPedidosDeUsuario(usuarioId: string): Promise<PedidoEntity[]> {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, status: StatusPedido): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.findOneBy({ id });
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    pedido.status = status;
    return this.pedidoRepository.save(pedido);
  }
}
