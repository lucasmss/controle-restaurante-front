import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoComponent } from './consumo';
import { ProdutoService } from '../../services/produto';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConsumoService } from '../../services/consumo';
import { PagamentoService } from '../../services/pagamento';

describe('ConsumoComponent', () => {
  let component: ConsumoComponent;
  let fixture: ComponentFixture<ConsumoComponent>;

  const produtoServiceMock = {
    getProdutos: () => of([])
  };

  const consumoServiceMock = {
    getConsumoById: () => of(null),
    getItensPedidos: () => of([]),
    getConsumosAbertos: () => of([])
  };

  const pagamentoServiceMock = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumoComponent],
      providers: [
        { provide: ProdutoService, useValue: produtoServiceMock },
        { provide: ConsumoService, useValue: consumoServiceMock },
        { provide: PagamentoService, useValue: pagamentoServiceMock },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
