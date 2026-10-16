import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsumoService } from '../../../services/consumo';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../../models/mesa.model';

@Component({
  imports: [FormsModule],
  selector: 'app-remover-mesa',
  styleUrl: './remover-mesa.css',
  templateUrl: './remover-mesa.html',
})
export class RemoverMesaComponent {
  constructor(private consumoService: ConsumoService) { }

  mesaNumero: number | null = null;

  @Output() mesaRemovida = new EventEmitter<void>();

  removerMesa() {
    if (this.mesaNumero != null) {
      this.consumoService.getMesaByNumero(this.mesaNumero!).subscribe({
        next: (mesa: Mesa) => {
          console.log('Removendo mesa:', mesa.id);
          this.consumoService.deleteMesa(mesa.id).subscribe({
            next: () => {
              this.mesaRemovida.emit();
              this.fecharModal();
            }, error: (error) => {
              console.error('Erro ao remover mesa:', error);
              alert('Erro ao remover mesa. Consumo Aberto.');
              this.fecharModal();
            }
          });
        },
        error: (error) => {
          console.error('Erro ao buscar mesa:', error);
          alert('Erro ao buscar mesa. Verifique se o número da mesa está correto.');
          this.fecharModal();
        }
      });
    } else {
      alert('Número da mesa inválido. Por favor, insira um número válido.');
    }
  }

  fecharModal() {
    document.getElementById('btnFecharModalRemoverMesa')?.click();
  }



}
