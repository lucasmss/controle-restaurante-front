import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarProdutoComponent } from './adicionar-produto';

describe('AdicionarProdutoComponent', () => {
  let component: AdicionarProdutoComponent;
  let fixture: ComponentFixture<AdicionarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarProdutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarProdutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
