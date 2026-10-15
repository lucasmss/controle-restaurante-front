import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ConsumoService } from '../../../services/consumo';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../../models/mesa.model';

@Component({
  imports: [FormsModule],
  selector: 'app-adicionar-mesa',
  styleUrl: './adicionar-mesa.css',
  templateUrl: './adicionar-mesa.html',
})
export class AdicionarMesaComponent {

  constructor(private consumoService: ConsumoService) { }

  mesaNumero: number | null = null;

  @Output() mesaAdicionada = new EventEmitter<void>();

  adicionarMesa() {

    if (this.mesaNumero === null || this.mesaNumero < 1) {
      return;
    }

    this.consumoService.postMesa(this.mesaNumero).subscribe({

      next: () => {

        console.log('Mesa cadastrada com sucesso!');

        this.mesaAdicionada.emit();

        this.mesaNumero = null;

        document
          .getElementById('btnFecharModalAdicionarMesa')
          ?.click();

      },

      error: (error) => {

        console.error('Erro ao cadastrar mesa:', error);

      }

    });

  }



}
