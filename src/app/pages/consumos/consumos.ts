import { Component, OnInit, signal } from '@angular/core';

import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';

import { AdicionarPedidoComponent } from '../consumo/adicionar-pedido/adicionar-pedido';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentoService } from '../../services/pagamento';
import { FecharConsumoComponent } from '../consumo/fechar-consumo/fechar-consumo';
import { Pedido } from '../../models/pedido.model';

@Component({
  imports: [AdicionarPedidoComponent, FecharConsumoComponent],
  selector: 'app-consumos',
  styleUrl: './consumos.css',
  templateUrl: './consumos.html',
})
export class ConsumosComponent implements OnInit {

  constructor(
    private consumoService: ConsumoService,
    private pagamentoService: PagamentoService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  consumosAbertos = signal<Consumo[]>([]);
  pedidos = signal<Pedido[]>([]);
  consumoId!: number;
  mesaSelecionada: number | null = null;
  consumo = signal<Consumo | null>(null);

  ngOnInit() {
    this.carregarConsumosAbertos();
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

  carregarConsumosAbertos() {

    this.consumoService.getConsumosAbertos().subscribe(consumos => {
      this.consumosAbertos.set(consumos);
    });

  }

  carregarPedidos(consumoId: number) {

    this.consumoService
      .getItensPedidos(consumoId)
      .subscribe({
        next: (pedidos) => {

          console.log('Pedidos recebidos:', pedidos);

          this.pedidos.set(pedidos);
          this.carregarConsumoId(consumoId);

        },

        error: (erro) => {

          console.error('Erro ao buscar pedidos:', erro);

        }
      });

  }

  consumoMesaPagina(consumoId: number) {
    this.router.navigate([consumoId, 'consumos']);
  }

  adicionarPedido(mesaNumero: number) {
    this.mesaSelecionada = mesaNumero;
  }

  voltarParaMesas() {
    this.router.navigate(['/mesas']);
  }

}