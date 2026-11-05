import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoverMesaComponent } from './remover-mesa';

describe('RemoverMesaComponent', () => {
  let component: RemoverMesaComponent;
  let fixture: ComponentFixture<RemoverMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoverMesaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoverMesaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
