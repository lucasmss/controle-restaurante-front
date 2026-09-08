import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';

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

  ngOnInit() {

    const consumoId = Number(
      this.route.snapshot.paramMap.get('consumoId')
    );

    console.log('ID do consumo:', consumoId);

    this.carregarConsumoId(consumoId);
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
}