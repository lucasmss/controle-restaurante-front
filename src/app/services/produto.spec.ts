import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProdutoService } from './produto';
import { Produto } from '../models/produto.model';

describe('ProdutoService', () => {

  let service: ProdutoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ProdutoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProdutoService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deveBuscarProdutos', () => {
    const produtosMock = [] as Produto[];

    let produtosRecebidos: Produto[] | undefined;

    service.getProdutos().subscribe(produtos => {
      produtosRecebidos = produtos;
    });

    const requisicao = httpMock.expectOne(
      'http://localhost:8080/produtos'
    );

    expect(requisicao.request.method).toBe('GET');

    requisicao.flush(produtosMock);

    expect(produtosRecebidos).toEqual(produtosMock);

  });

  it('deveCadastrarProduto', () => {
    const produtoMock: Produto = {
      codigo: 100,
      name: 'Café Expresso',
      preco: 8.50,
      ativo: true
    };

    service.postProduto(produtoMock).subscribe();

    const requisicao = httpMock.expectOne(
      'http://localhost:8080/produtos'
    );

    expect(requisicao.request.method).toBe('POST');
    expect(requisicao.request.body).toEqual(produtoMock);

    requisicao.flush({});

  });

});