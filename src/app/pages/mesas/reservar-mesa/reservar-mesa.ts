import { Component } from '@angular/core';
import { ConsumoService } from '../../../services/consumo';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-reservar-mesa',
  styleUrl: './reservar-mesa.css',
  templateUrl: './reservar-mesa.html',
})
export class ReservarMesaComponent {
  constructor(private consumoService: ConsumoService) { }

  mesaNumero: number | null = null;

  reservarMesa() { }


}
