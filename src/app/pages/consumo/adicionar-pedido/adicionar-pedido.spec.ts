import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarPedidoComponent } from './adicionar-pedido';

describe('AdicionarPedidoComponent', () => {
  let component: AdicionarPedidoComponent;
  let fixture: ComponentFixture<AdicionarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
