import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { ProdutoService } from '../../../services/produto';
import { ConsumoService } from '../../../services/consumo';
import { Produto } from '../../../models/produto.model';

@Component({
  imports: [],
  selector: 'app-adicionar-pedido',
  styleUrl: './adicionar-pedido.css',
  templateUrl: './adicionar-pedido.html',
})
export class AdicionarPedidoComponent implements OnInit {
  constructor(private http: HttpClient, private produtoService: ProdutoService, private consumoService: ConsumoService) {}

  pedidos: Produto[] = [];

  ngOnInit() {
    
  }

}
