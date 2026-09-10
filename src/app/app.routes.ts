import { Routes } from '@angular/router';
import { MesasComponent } from './pages/mesas/mesas';
import { ConsumosComponent } from './pages/consumos/consumos';
import { ConsumoComponent } from './pages/consumo/consumo';
import { CardapioComponent } from './pages/cardapio/cardapio';

export const routes: Routes = [
    {
        path: 'mesas',
        component: MesasComponent
    },
    {
        path: 'consumos',
        component: ConsumosComponent
    },
     {
        path: ':consumoId/consumos',
        component: ConsumoComponent
    },
     {
        path: 'cardapio',
        component: CardapioComponent
    },
];
