import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarPedidoComponent } from './adicionar-pedido';
import { ConsumoService } from '../../../services/consumo';
import { ProdutoService } from '../../../services/produto';
import { of } from 'rxjs';

describe('AdicionarPedidoComponent', () => {
  let component: AdicionarPedidoComponent;
  let fixture: ComponentFixture<AdicionarPedidoComponent>;

  const ProdutoServiceMock = {
    getProdutos: () => of([])
  }

  const ConsumoServiceMock = {
    getConsumosAbertos: () => of([])

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPedidoComponent],
      providers: [
        { provide: ProdutoService, useValue: ProdutoServiceMock },
        { provide: ConsumoService, useValue: ConsumoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
