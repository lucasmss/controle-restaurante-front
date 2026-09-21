import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto';
import { Produto } from '../../../models/produto.model';

@Component({
  imports: [FormsModule],
  selector: 'app-adicionar-produto',
  styleUrl: './adicionar-produto.css',
  templateUrl: './adicionar-produto.html',
})
export class AdicionarProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  inserirProduto: {
    codigo: number | null;
    name: string;
    preco: number | null;
  }[] = [
      {
        codigo: null,
        name: '',
        preco: null
      }
    ];

  ngOnInit() { }

  adicionarItem() {
    this.inserirProduto.push({
      codigo: null,
      name: '',
      preco: null
    });
  }

  removerItem(index: number) {
    this.inserirProduto.splice(index, 1);
  }

  adicionarProduto() {
    const produtosValidos = this.inserirProduto.filter(produto =>
      produto.codigo !== null &&
      produto.name.trim() !== '' &&
      produto.preco !== null
    );

    produtosValidos.forEach(produto => {

      const novoProduto: Produto = {
        codigo: produto.codigo!,
        name: produto.name,
        preco: produto.preco!,
        ativo: true
      };

      this.produtoService.postProduto(novoProduto).subscribe({
        next: () => {
          console.log('Produto cadastrado:', novoProduto);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar produto:', erro);
        }
      });

    });
  }

}