import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoverMesa } from './remover-mesa';

describe('RemoverMesa', () => {
  let component: RemoverMesa;
  let fixture: ComponentFixture<RemoverMesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoverMesa],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoverMesa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
