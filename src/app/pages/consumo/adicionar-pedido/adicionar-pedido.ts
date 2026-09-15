import { Component, OnInit } from '@angular/core';
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

  constructor(
    private produtoService: ProdutoService,
    private consumoService: ConsumoService
  ) {}

  produtos: Produto[] = [];

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos.filter(produto => produto.ativo);
    });
  }
}