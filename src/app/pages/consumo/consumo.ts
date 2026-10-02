import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';
import { Pedido } from '../../models/pedido.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ItemPedido } from '../../models/item-pedido.model';
import { AtualizarPedidoComponent } from './atualizar-pedido/atualizar-pedido';

@Component({
  imports: [CurrencyPipe, DatePipe, AtualizarPedidoComponent],
  selector: 'app-consumo',
  styleUrl: './consumo.css',
  templateUrl: './consumo.html',
})
export class ConsumoComponent implements OnInit {

  constructor(
    private consumoService: ConsumoService,
    private route: ActivatedRoute,
  ) { }

  consumo = signal<Consumo | null>(null);
  pedidos = signal<Pedido[]>([]);
  consumoId!: number;

  itemSelecionado: ItemPedido | null = null;

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

        },

        error: (erro) => {

          console.error('Erro ao buscar pedidos:', erro);

        }
      });

  }

  editarItemPedido(item: ItemPedido) {
    this.itemSelecionado = {
      ...item,
      produto: {
        ...item.produto
      }
    };
  }

  removerPedido(pedidoId: number) {
    this.consumoService.deletePedido(pedidoId).subscribe({});
  }

}