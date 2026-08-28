import { Consumo } from "./consumo.model";
import { ItemPedido } from "./item-pedido.model";

export interface Pedido {
  id: number;
  dataPedido: string;
  status: string;
  itens: ItemPedido[];
  consumo: Consumo;
}
