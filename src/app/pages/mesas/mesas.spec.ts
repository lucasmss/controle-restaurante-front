import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesasComponent } from './mesas';
import { ConsumoService } from '../../services/consumo';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { provideRouter, Router } from '@angular/router';
import { Consumo } from '../../models/consumo.model';

describe('MesasComponent', () => {

  let component: MesasComponent;
  let fixture: ComponentFixture<MesasComponent>;

  const consumoServiceMock = {

    getMesas: () => of([]),
    getConsumosAbertos: vi.fn(() => of([])),
    postConsumo: vi.fn(() => of(null)),
    getConsumoByMesaId: vi.fn(() => of({ id: 10 } as Consumo))

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

  it('deveEnviarIdDaMesaAoAbrirConsumo', () => {

    component.abrirConsumo(5);

    expect(consumoServiceMock.postConsumo).toHaveBeenCalledWith(5);

  });

  it('deveAtualizarConsumosAbertosAposAbrirConsumo', () => {

    consumoServiceMock.getConsumosAbertos.mockClear();

    component.abrirConsumo(5);

    expect(consumoServiceMock.getConsumosAbertos).toHaveBeenCalledTimes(1);

  });

  it('deveNaoAtualizarConsumosAbertosQuandoAbrirConsumoFalhar', () => {

    consumoServiceMock.getConsumosAbertos.mockClear();

    consumoServiceMock.postConsumo.mockReturnValueOnce(
      throwError(() => new Error('Erro ao abrir consumo')));

    component.abrirConsumo(5);

    expect(consumoServiceMock.getConsumosAbertos).not.toHaveBeenCalled();

  });

  it('deveNavegarParaPaginaDeConsumoAoChamarConsumoPagina', () => {

    const router = TestBed.inject(Router);

    const navegarSpy = vi.spyOn(router, 'navigate');

    navegarSpy.mockResolvedValue(true);

    component.consumoPagina(5);

    expect(consumoServiceMock.getConsumoByMesaId).toHaveBeenCalledWith(5);

    expect(navegarSpy).toHaveBeenCalledWith([10, 'consumos']);

  });

});