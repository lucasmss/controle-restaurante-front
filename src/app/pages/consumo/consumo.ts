import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';
import { Pedido } from '../../models/pedido.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ItemPedido } from '../../models/item-pedido.model';
import { AtualizarPedidoComponent } from './atualizar-pedido/atualizar-pedido';
import { AdicionarPedidoComponent } from './adicionar-pedido/adicionar-pedido';
import { PagamentoService } from '../../services/pagamento';
import { FecharConsumoComponent } from './fechar-consumo/fechar-consumo';

@Component({
  imports: [CurrencyPipe, DatePipe, AtualizarPedidoComponent, AdicionarPedidoComponent, FecharConsumoComponent],
  selector: 'app-consumo',
  styleUrl: './consumo.css',
  templateUrl: './consumo.html',
})
export class ConsumoComponent implements OnInit {

  constructor(
    private consumoService: ConsumoService,
    private pagamentoService: PagamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  consumo = signal<Consumo | null>(null);
  pedidos = signal<Pedido[]>([]);
  consumoId!: number;
  mesaId: number | null = null;
  itemSelecionado: ItemPedido | null = null;
  mesaSelecionada: number | null = null;

  totalConsumido = computed(() =>
    this.pedidos().reduce(
      (totalPedidos, pedido) =>
        totalPedidos +
        pedido.itens.reduce(
          (totalPedido, item) =>
            totalPedido +
            (item.precoUnitario ?? 0) * (item.quantidade ?? 0),
          0
        ),
      0
    )
  );

  ngOnInit() {

    this.consumoId = Number(
      this.route.snapshot.paramMap.get('consumoId')
    );

    console.log('ID do consumo:', this.consumoId);

    this.carregarConsumoId(this.consumoId);
    this.carregarPedidos(this.consumoId);

  }

  carregarConsumoId(consumoId: number) {

    this.consumoService
      .getConsumoById(consumoId)
      .subscribe({
        next: (consumo) => {

          console.log('Consumo recebido:', consumo);

          this.consumo.set(consumo);

        },

        error: (erro) => {

          console.error('Erro ao buscar consumo:', erro);

        }
      });

  }

  carregarPedidos(consumoId: number) {

    this.consumoService
      .getItensPedidos(consumoId)
      .subscribe({
        next: (pedidos) => {

          console.log('Pedidos recebidos:', pedidos);

          this.pedidos.set(pedidos);
          this.carregarConsumoId(this.consumoId);

        },

        error: (erro) => {

          console.error('Erro ao buscar pedidos:', erro);

        }
      });

  }

  adicionarPedido(mesaNumero: number) {
    this.mesaSelecionada = mesaNumero;
  }

  editarItemPedido(item: ItemPedido) {
    this.itemSelecionado = {
      ...item,
      produto: {
        ...item.produto
      }
    };
  }

  removerPedido(pedidoId: number, mesaId: number) {
    this.consumoService.deletePedido(pedidoId).subscribe({
      next: () => {
        console.log('Pedido removido com sucesso');
        this.consumoService.putAtualizarValorConsumo(mesaId).subscribe(() => {
          console.log('Mesa ID:', mesaId);
        });
        this.carregarConsumoId(this.consumoId);
        this.carregarPedidos(this.consumoId);
      },
      error: (erro) => {
        console.error('Erro ao remover pedido:', erro);
      }
    });
  }

  voltarParaMesas() {
    this.router.navigate(['/mesas']);
  }

}