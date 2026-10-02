import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ProdutoService } from '../../../services/produto';
import { ConsumoService } from '../../../services/consumo';

import { ItemPedido } from '../../../models/item-pedido.model';
import { Produto } from '../../../models/produto.model';

@Component({
  imports: [FormsModule],
  selector: 'app-atualizar-pedido',
  styleUrl: './atualizar-pedido.css',
  templateUrl: './atualizar-pedido.html',
})
export class AtualizarPedidoComponent implements OnInit, OnChanges {

  constructor(
    private produtoService: ProdutoService,
    private consumoService: ConsumoService
  ) { }

  @Input() item: ItemPedido | null = null;

  @Output() itemAtualizado = new EventEmitter<void>();

  produtos: Produto[] = [];

  produtoSelecionadoId: number | null = null;

  atualizarItem = {
    id: 0,

    produto: {
      id: 0,
      codigo: 0,
      name: '',
      preco: 0,
      ativo: true
    },

    quantidade: 1,

    precoUnitario: 0
  };

  ngOnInit() {
    this.carregarProdutos();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['item'] && this.item) {

      this.atualizarItem = {
        id: this.item.id,

        produto: {
          id: this.item.produto.id ?? 0,
          codigo: this.item.produto.codigo,
          name: this.item.produto.name,
          preco: this.item.produto.preco,
          ativo: this.item.produto.ativo
        },

        quantidade: this.item.quantidade,
        precoUnitario: this.item.precoUnitario
      };

      this.produtoSelecionadoId = this.item.produto.id ?? null;

    }

  }

  carregarProdutos() {

    this.produtoService.getProdutos().subscribe({

      next: (produtos) => {

        this.produtos = produtos.filter(
          produto => produto.ativo
        );

      },

      error: (erro) => {

        console.error(
          'Erro ao carregar produtos:',
          erro
        );

      }

    });

  }

  atualizarItemPedido() {

    if (this.produtoSelecionadoId === null) {

      console.warn(
        'Selecione um produto.'
      );

      return;
    }

    if (this.atualizarItem.quantidade <= 0) {

      console.warn(
        'A quantidade deve ser maior que zero.'
      );

      return;
    }

    const itemAtualizado = {

      produto: {
        id: this.produtoSelecionadoId
      },

      quantidade: this.atualizarItem.quantidade

    };

    this.consumoService.putItemPedido(
      this.atualizarItem.id,
      itemAtualizado
    ).subscribe({

      next: () => {

        console.log(
          'Item do pedido atualizado com sucesso'
        );

        this.itemAtualizado.emit();

        this.limparFormulario();

        this.fecharModal();

      },

      error: (erro) => {

        console.error(
          'Erro ao atualizar item do pedido:',
          erro
        );

      }

    });

  }

  limparFormulario() {

    this.atualizarItem = {

      id: 0,

      produto: {
        id: 0,
        codigo: 0,
        name: '',
        preco: 0,
        ativo: true
      },

      quantidade: 1,

      precoUnitario: 0

    };

    this.produtoSelecionadoId = null;

  }

  fecharModal() {

    const botaoFechar = document.getElementById(
      'btnFecharModalAtualizarItemPedido'
    );

    botaoFechar?.click();

  }

}