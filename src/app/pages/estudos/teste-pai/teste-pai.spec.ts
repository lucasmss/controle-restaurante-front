import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestePaiComponent } from './teste-pai';

describe('TestePaiComponent', () => {
  let component: TestePaiComponent;
  let fixture: ComponentFixture<TestePaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestePaiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestePaiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
