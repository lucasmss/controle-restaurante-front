import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoComponent } from './consumo';

describe('ConsumoComponent', () => {
  let component: ConsumoComponent;
  let fixture: ComponentFixture<ConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
