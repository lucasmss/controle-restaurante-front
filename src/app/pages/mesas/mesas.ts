import { Component, OnInit} from '@angular/core';
import { ConsumoService } from '../../services/consumo';
import { Mesa } from '../../models/mesa.model';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [DecimalPipe],
  selector: 'app-mesas',
  styleUrl: './mesas.css',
  templateUrl: './mesas.html',
  providers: [DecimalPipe],
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


}

