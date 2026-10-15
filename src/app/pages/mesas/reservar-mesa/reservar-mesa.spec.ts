import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservarMesaComponent } from './reservar-mesa';

describe('ReservarMesaComponent', () => {
  let component: ReservarMesaComponent;
  let fixture: ComponentFixture<ReservarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarMesaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservarMesaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
