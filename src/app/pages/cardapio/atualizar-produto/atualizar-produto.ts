import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { ProdutoService } from '../../../services/produto';
import { Produto } from '../../../models/produto.model';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-atualizar-produto',
  styleUrl: './atualizar-produto.css',
  templateUrl: './atualizar-produto.html',
})
export class AtualizarProdutoComponent implements OnInit, OnChanges {

  constructor(
    private produtoService: ProdutoService,
  ) { }

  @Input() produto: Produto | null = null;

  @Output() produtoAtualizado = new EventEmitter<void>();

  atualizaritem: Produto = {
    id: 0,
    codigo: 0,
    name: '',
    preco: 0,
    ativo: true
  };

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['produto'] && this.produto) {

      this.atualizaritem = {
        ...this.produto
      };

    }

  }

  limparFormulario() {

    this.atualizaritem = {
      id: 0,
      codigo: 0,
      name: '',
      preco: 0,
      ativo: true
    };

  }

  fecharModal() {
    const botaoFechar = document.getElementById(
      'btnFecharModalAtualizarProduto'
    );

    botaoFechar?.click();
  }

  atualizarProduto(produtoId: number, produto: Produto) {

    this.produtoService.putProduto(produtoId, produto).subscribe({

      next: () => {

        console.log('Produto atualizado com sucesso');

        // avisa o componente pai
        this.produtoAtualizado.emit();

        // limpa o formulário
        this.limparFormulario();

        // fecha o modal
        this.fecharModal();

      },

      error: (erro) => {

        console.error('Erro ao atualizar produto:', erro);

      }

    });

  }

}

