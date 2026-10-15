import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsumoService } from '../../../services/consumo';
import { FormsModule } from '@angular/forms';

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
    console.log('Removendo mesa:', this.mesaNumero);
    this.consumoService.deleteMesa(this.mesaNumero!).subscribe({
      next: () => {
        this.mesaRemovida.emit();
        this.fecharModal();
      }, error: (error) => {
        console.error('Erro ao remover mesa:', error);
      }
    });
  }

  fecharModal() {
    document.getElementById('btnFecharModalRemoverMesa')?.click();
  }



}
