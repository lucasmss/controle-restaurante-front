import { Component, OnInit} from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Mesa } from '../../models/mesa.model';


@Component({
  imports: [],
  selector: 'app-mesas',
  styleUrl: './mesas.css',
  templateUrl: './mesas.html',
  providers: [],
})
export class MesasComponent implements OnInit {
  constructor(private consumoService: ConsumoService) {}

  mesas: Mesa[] = [];

  ngOnInit() {
    this.carregarMesas();
  }

  carregarMesas(){
    this.consumoService.getMesas().subscribe((mesas) => {
      this.mesas = mesas;
    });
  }

  abrirConsumo(mesaId: number) {
    this.consumoService.postConsumo(mesaId).subscribe((res) => {

    });
}


}

