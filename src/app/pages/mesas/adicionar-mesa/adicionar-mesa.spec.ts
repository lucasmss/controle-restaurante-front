import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarMesaComponent } from './adicionar-mesa';

describe('AdicionarMesaComponent', () => {
  let component: AdicionarMesaComponent;
  let fixture: ComponentFixture<AdicionarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarMesaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarMesaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
