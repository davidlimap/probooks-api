import { IsEnum } from 'class-validator';
import { StatusPedido } from '../../../enums/status-pedido.enum';

export class AtualizaPedidoDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}