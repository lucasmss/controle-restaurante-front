import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumosComponent } from './consumos';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConsumoService } from '../../services/consumo';
import { PagamentoService } from '../../services/pagamento';
import { ProdutoService } from '../../services/produto';

describe('ConsumosComponent', () => {
  let component: ConsumosComponent;
  let fixture: ComponentFixture<ConsumosComponent>;

  const consumoServiceMock = {
    getConsumosAbertos: () => of([])
  };

  const pagamentoServiceMock = {
    getPagamentos: () => of([])
  };

  const produtoServiceMock = {
    getProdutos: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumosComponent],
      providers: [
        provideRouter([]),
        { provide: ConsumoService, useValue: consumoServiceMock },
        { provide: PagamentoService, useValue: pagamentoServiceMock },
        { provide: ProdutoService, useValue: produtoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
