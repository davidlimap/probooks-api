import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string, @Body() dadosPedido: CriaPedidoDTO) {
    const pedidoCriado = await this.pedidoService.cadastrarPedido(usuarioId, dadosPedido);
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
    return pedidos;
  }

}
