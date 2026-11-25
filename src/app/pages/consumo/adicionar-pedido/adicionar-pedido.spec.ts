
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarPedidoComponent } from './adicionar-pedido';
import { ConsumoService } from '../../../services/consumo';
import { ProdutoService } from '../../../services/produto';
import { of } from 'rxjs';
import { Produto } from '../../../models/produto.model';
import { vi } from 'vitest';
import { Consumo } from '../../../models/consumo.model';

describe('AdicionarPedidoComponent', () => {
  let component: AdicionarPedidoComponent;
  let fixture: ComponentFixture<AdicionarPedidoComponent>;

  const produtosMock = [
    { ativo: true } as Produto,
    { ativo: false } as Produto
  ];

  const produtoServiceMock = {
    getProdutos: () => of(produtosMock)
  };

  const consumoServiceMock = {
    getConsumosAbertos: vi.fn(() => of([] as Consumo[])),
    postPedido: vi.fn(() => of(null)),
    putAtualizarValorConsumo: vi.fn(() => of(null))
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [AdicionarPedidoComponent],
      providers: [
        { provide: ProdutoService, useValue: produtoServiceMock },
        { provide: ConsumoService, useValue: consumoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveCarregarApenasProdutosAtivos', () => {
    component.carregarProdutos();

    expect(component.produtos).toHaveLength(1);
    expect(component.produtos[0].ativo).toBe(true);
  });

  it('deveDiminuirQuantidadeDoItem', () => {
    const item = { produtoId: 1, quantidade: 3 };

    component.diminuirQuantidade(item);

    expect(item.quantidade).toBe(2);
  });

  it('naoDeveDiminuirQuantidadeDoItemAbaixoDeUm', () => {
    const item = { produtoId: 1, quantidade: 1 };

    component.diminuirQuantidade(item);

    expect(item.quantidade).toBe(1);
  });

  it('deveAumentarQuantidadeDoItem', () => {
    const item = { produtoId: 1, quantidade: 2 };

    component.aumentarQuantidade(item);

    expect(item.quantidade).toBe(3);
  });

  it('deveAdicionarItem', () => {
    component.adicionarItem();

    expect(component.itensPedido).toHaveLength(2);
    expect(component.itensPedido[1]).toEqual({
      produtoId: null,
      quantidade: 1
    });
  });

  it('deveRemoverItem', () => {
    const item1 = { produtoId: 10, quantidade: 2 };
    const item2 = { produtoId: 20, quantidade: 1 };

    component.itensPedido = [item1, item2];

    component.removerItem(0);

    expect(component.itensPedido).toHaveLength(1);
    expect(component.itensPedido[0]).toEqual(item2);
  });

  it('deveBuscarConsumoDaMesaSelecionada', () => {
    const consumoMock = {
      id: 50,
      mesa: {
        id: 8,
        numero: 4
      }
    } as Consumo;

    consumoServiceMock.getConsumosAbertos.mockReturnValueOnce(
      of([consumoMock])
    );

    component.mesaNumero = 4;
    component.buscarConsumoDaMesa();

    expect(component.consumoId).toBe(50);
    expect(component.mesaId).toBe(8);
  });

  it('naoDeveEnviarPedidoQuandoNaoExistirConsumo', () => {
    component.consumoId = null;

    component.fazerPedido();

    expect(consumoServiceMock.postPedido).not.toHaveBeenCalled();
  });

  it('deveEnviarPedidoQuandoExistirConsumo', () => {
    component.consumoId = 50;
    component.mesaId = 8;

    component.itensPedido = [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 2, quantidade: 1 }
    ];

    component.fazerPedido();

    expect(consumoServiceMock.postPedido).toHaveBeenCalledWith(
      50,
      {
        itens: [
          {
            produto: { id: 1 },
            quantidade: 2
          },
          {
            produto: { id: 2 },
            quantidade: 1
          }
        ]
      }
    );

    expect(consumoServiceMock.putAtualizarValorConsumo)
      .toHaveBeenCalledWith(8);
  });
});
