import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarPedidoComponent } from './atualizar-pedido';

describe('AtualizarPedidoComponent', () => {
  let component: AtualizarPedidoComponent;
  let fixture: ComponentFixture<AtualizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
