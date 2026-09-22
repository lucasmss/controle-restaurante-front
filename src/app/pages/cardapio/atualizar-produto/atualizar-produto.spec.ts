import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarProdutoComponent } from './atualizar-produto';

describe('AtualizarProdutoComponent', () => {
  let component: AtualizarProdutoComponent;
  let fixture: ComponentFixture<AtualizarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarProdutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarProdutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
