import { Component, OnInit, signal } from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Mesa } from '../../models/mesa.model';
import { Consumo } from '../../models/consumo.model';
import { Router } from '@angular/router';
import { AdicionarMesaComponent } from './adicionar-mesa/adicionar-mesa';

@Component({
  imports: [AdicionarMesaComponent],
  selector: 'app-mesas',
  styleUrl: './mesas.css',
  templateUrl: './mesas.html',
  providers: [],
})
export class MesasComponent implements OnInit {
  constructor(private consumoService: ConsumoService, private router: Router) { }

  mesas = signal<Mesa[]>([]);
  consumosAbertos = signal<Consumo[]>([]);
  mesaAdicionada = signal<Mesa | null>(null);

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
    this.consumoService.postConsumo(mesaId).subscribe({
      next: () => {
        console.error('Mesa aberta com sucesso');
        this.carregarConsumosAbertos();
      },
      error: (erro) => {
        console.error('Erro ao abrir consumo:', erro);
      }
    });
  }

  consumoPagina(mesaId: number) {
    this.consumoService.getConsumoByMesaId(mesaId).subscribe((consumo) => {
      this.router.navigate([consumo.id, 'consumos']);
    });

  }

}

