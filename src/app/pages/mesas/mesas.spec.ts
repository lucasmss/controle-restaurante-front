import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesasComponent } from './mesas';
import { ConsumoService } from '../../services/consumo';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { Consumo } from '../../models/consumo.model';

describe('MesasComponent', () => {

  let component: MesasComponent;
  let fixture: ComponentFixture<MesasComponent>;

  const consumoServiceMock = {

    getMesas: () => of([]),
    getConsumosAbertos: () => of([])

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [MesasComponent],

      providers: [
        {
          provide: ConsumoService,
          useValue: consumoServiceMock
        },

        provideRouter([])
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(MesasComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });


  it('deveRetornarTrueQuandoMesaEstiverOcupada', () => {

    component.consumosAbertos.set([
      {
        mesa: {
          id: 5
        }
      } as Consumo
    ]);

    expect(component.mesaOcupada(5)).toBe(true);

  });


  it('deveRetornarFalseQuandoMesaNaoEstiverOcupada', () => {

    component.consumosAbertos.set([
      {
        mesa: {
          id: 2
        }
      } as Consumo,

      {
        mesa: {
          id: 3
        }
      } as Consumo

    ]);

    expect(component.mesaOcupada(4)).toBe(false);

  });


});