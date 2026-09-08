import { Component, OnInit, signal } from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Mesa } from '../../models/mesa.model';
import { Consumo } from '../../models/consumo.model';
import { Router } from '@angular/router';


@Component({
  imports: [],
  selector: 'app-mesas',
  styleUrl: './mesas.css',
  templateUrl: './mesas.html',
  providers: [],
})
export class MesasComponent implements OnInit {
  constructor(private consumoService: ConsumoService, private router: Router) {}

  mesas = signal<Mesa[]>([]);
  consumosAbertos = signal<Consumo[]>([]);

  ngOnInit() {
    this.carregarMesas();
    this.carregarConsumosAbertos();
  }

  carregarMesas() {
    this.consumoService.getMesas().subscribe((mesas) => {
    this.mesas.set(mesas);
    });
  }

  carregarConsumosAbertos() {
    this.consumoService.getConsumosAbertos().subscribe((consumos) => {
    this.consumosAbertos.set(consumos);
    });
  }

    mesaOcupada(mesaId: number): boolean {
    return this.consumosAbertos().some(
      consumo => consumo.mesa.id === mesaId
    );
  }

  abrirConsumo(mesaId: number) {
    this.consumoService.postConsumo(mesaId).subscribe((res) => {

    });
}

  consumosPagina() {
    this.router.navigate(['/consumos']);
  }

  consumoMesaPagina(consumoId: number){
    this.router.navigate([consumoId,'/consumo']);
  }

}

