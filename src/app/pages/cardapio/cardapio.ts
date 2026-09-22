import { Component, OnInit, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto';
import { AtualizarProdutoComponent } from './atualizar-produto/atualizar-produto';

@Component({
  imports: [AdicionarProdutoComponent, AtualizarProdutoComponent],
  selector: 'app-cardapio',
  styleUrl: './cardapio.css',
  templateUrl: './cardapio.html',
})
export class CardapioComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  produtoSelecionado: Produto | null = null;

  cardapio = signal<Produto[]>([]);

  ngOnInit() {
    this.carregarCardapio();
  }

  carregarCardapio() {
    this.produtoService.getProdutos().subscribe((produtos) => {

      produtos.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

      this.cardapio.set(produtos);

    });
  }

  editarProduto(produto: Produto) {
    this.produtoSelecionado = {
      ...produto
    };
  }

  excluirProduto(produtoId: number) {
    this.produtoService.deleteProduto(produtoId).subscribe(() => {
      this.carregarCardapio();
    });
  }


}
