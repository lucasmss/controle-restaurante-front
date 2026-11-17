import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardapioComponent } from './cardapio';
import { ProdutoService } from '../../services/produto';
import { of } from 'rxjs';

describe('CardapioComponent', () => {
  let component: CardapioComponent;
  let fixture: ComponentFixture<CardapioComponent>;

  const ProdutoServiceMock = {
    getProdutos: () => of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardapioComponent],
      providers: [
        { provide: ProdutoService, useValue: ProdutoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardapioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
