import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ProdutoService } from '../../../services/produto';
import { ConsumoService } from '../../../services/consumo';

import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-adicionar-pedido',
  imports: [DecimalPipe],
  templateUrl: './adicionar-pedido.html',
  styleUrl: './adicionar-pedido.css'
})
export class AdicionarPedidoComponent implements OnInit, OnChanges {

  @Input() mesaNumero: number | null = null;

  produtos: Produto[] = [];

  consumoId: number | null = null;

  itensPedido: {
    produtoId: number | null;
    quantidade: number;
  }[] = [
      {
        produtoId: null,
        quantidade: 1
      }
    ];

  constructor(
    private produtoService: ProdutoService,
    private consumoService: ConsumoService
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['mesaNumero'] && this.mesaNumero !== null) {
      this.buscarConsumoDaMesa();
    }

  }

  ngOnInit() {
    this.carregarProdutos();
    this.buscarConsumoDaMesa();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos.filter(produto => produto.ativo);
    });
  }

  buscarConsumoDaMesa() {

    this.consumoService.getConsumosAbertos().subscribe(consumos => {

      const consumo = consumos.find(
        consumo => consumo.mesa.numero === this.mesaNumero
      );

      if (consumo) {
        this.consumoId = consumo.id;
      }

    });

  }

  selecionarProduto(item: any, event: Event) {

    const select = event.target as HTMLSelectElement;

    item.produtoId = select.value
      ? Number(select.value)
      : null;

  }

  adicionarItem() {

    this.itensPedido.push({
      produtoId: null,
      quantidade: 1
    });

  }

  aumentarQuantidade(item: any) {

    item.quantidade++;

  }

  diminuirQuantidade(item: any) {

    if (item.quantidade > 1) {
      item.quantidade--;
    }

  }

  removerItem(index: number) {

    this.itensPedido.splice(index, 1);

  }

  fazerPedido() {

    if (!this.consumoId) {
      console.error('Consumo não encontrado.');
      return;
    }

    const itensValidos = this.itensPedido.filter(
      item => item.produtoId !== null
    );

    const pedido = {
      itens: itensValidos.map(item => ({
        produto: {
          id: item.produtoId
        },
        quantidade: item.quantidade
      }))
    };

    this.consumoService.postPedido(this.consumoId, pedido).subscribe(() => {
      console.log('Pedido enviado:', pedido);
    });

  }

}