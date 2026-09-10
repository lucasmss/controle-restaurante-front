import { Component, OnInit, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';

@Component({
  imports: [],
  selector: 'app-cardapio',
  styleUrl: './cardapio.css',
  templateUrl: './cardapio.html',
})
export class CardapioComponent implements OnInit {

  constructor(private produtoService: ProdutoService) {}

  cardapio = signal<Produto[]>([]);

  ngOnInit() {
    this.carregarCardapio();
  }

  carregarCardapio() {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.cardapio.set(produtos);
    });
  }

  adicionarProduto() {
    console.log('Adicionar produto');
  }

  editarProduto(produtoId: number) {
    console.log('Editar produto:', produtoId);
  }

  excluirProduto(produtoId: number) {
    console.log('Excluir produto:', produtoId);
  }

  
}
