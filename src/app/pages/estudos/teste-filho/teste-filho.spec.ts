import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesteFilhoComponent } from './teste-filho';

describe('TesteFilhoComponent', () => {
  let component: TesteFilhoComponent;
  let fixture: ComponentFixture<TesteFilhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteFilhoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TesteFilhoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
