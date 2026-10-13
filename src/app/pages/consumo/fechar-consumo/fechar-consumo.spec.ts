import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FecharConsumoComponent } from './fechar-consumo';

describe('FecharConsumo', () => {
  let component: FecharConsumoComponent;
  let fixture: ComponentFixture<FecharConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FecharConsumoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FecharConsumoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
