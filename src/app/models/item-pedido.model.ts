import { Pedido } from "./pedido.model";
import { Produto } from "./produto.model";

export interface ItemPedido {
  id: number;
  pedido: Pedido;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
}
