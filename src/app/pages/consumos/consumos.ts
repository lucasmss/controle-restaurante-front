import { Component, OnInit, signal } from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Consumo } from '../../models/consumo.model';
import { Mesa } from '../../models/mesa.model';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-consumos',
  styleUrl: './consumos.css',
  templateUrl: './consumos.html',
})
export class ConsumosComponent implements OnInit {
  constructor(private consumoService: ConsumoService, private router: Router) {}

  mesas = signal<Mesa[]>([]);
  consumosAbertos = signal<Consumo[]>([]);

  ngOnInit(): void {
    this.carregarConsumosAbertos();
  }

  carregarConsumosAbertos() {
    this.consumoService.getConsumosAbertos().subscribe((consumos) => {
    this.consumosAbertos.set(consumos);
    });
  } 

  consumoMesaPagina(consumoId: number){
    this.router.navigate([consumoId, 'consumos']);
  }

  adicionarPedido(){}
}
