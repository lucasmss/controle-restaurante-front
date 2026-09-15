import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';
import { Pedido } from '../../models/pedido.model';

@Component({
  imports: [],
  selector: 'app-consumo',
  styleUrl: './consumo.css',
  templateUrl: './consumo.html',
})
export class ConsumoComponent implements OnInit {

  constructor(
    private consumoService: ConsumoService,
    private route: ActivatedRoute
  ) {}

  consumo = signal<Consumo | null>(null);
  pedidos = signal<Pedido[]>([]);

  ngOnInit() {

    const consumoId = Number(
      this.route.snapshot.paramMap.get('consumoId')
    );

    console.log('ID do consumo:', consumoId);

    this.carregarConsumoId(consumoId);
    this.carregarPedidos(consumoId);
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

}