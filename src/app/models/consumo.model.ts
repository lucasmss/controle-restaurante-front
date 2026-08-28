import { Mesa } from "./mesa.model";
import { Pagamento } from "./pagamento.model";
import { Pedido } from "./pedido.model";

export interface Consumo {
  id: number;
  mesa: Mesa;
  status: string;
  dataAbertura: string;
  taxaServicoAceita: boolean;
  pagamentos: Pagamento[];
  pedidos: Pedido[];
  valorConsumido: number;
  valorTaxaServico: number;
  valorTotal: number;

}
