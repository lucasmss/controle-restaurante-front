import { Component, OnInit, signal } from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Mesa } from '../../models/mesa.model';
import { Consumo } from '../../models/consumo.model';


@Component({
  imports: [],
  selector: 'app-mesas',
  styleUrl: './mesas.css',
  templateUrl: './mesas.html',
  providers: [],
})
export class MesasComponent implements OnInit {
  constructor(private consumoService: ConsumoService) {}

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
    this.consumoService.getMesasOcupada().subscribe((consumos) => {
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


}

