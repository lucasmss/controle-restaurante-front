import { Component, OnInit, signal } from '@angular/core';

import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';

import { AdicionarPedidoComponent } from '../consumo/adicionar-pedido/adicionar-pedido';
import { Router } from '@angular/router';

@Component({
  imports: [AdicionarPedidoComponent],
  selector: 'app-consumos',
  styleUrl: './consumos.css',
  templateUrl: './consumos.html',
})
export class ConsumosComponent implements OnInit {

  constructor(
    private consumoService: ConsumoService,
    private router: Router
  ) {}

  consumosAbertos = signal<Consumo[]>([]);

  mesaSelecionada: number | null = null;

  ngOnInit(): void {
    this.carregarConsumosAbertos();
  }

  carregarConsumosAbertos() {

    this.consumoService.getConsumosAbertos().subscribe(consumos => {
      this.consumosAbertos.set(consumos);
    });

  }

  consumoMesaPagina(consumoId: number) {
    this.router.navigate([consumoId, 'consumos']);
  }

  adicionarPedido(mesaNumero: number) {
    this.mesaSelecionada = mesaNumero;
  }

}