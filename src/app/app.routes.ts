import { Routes } from '@angular/router';
import { MesasComponent } from './pages/mesas/mesas';
import { ConsumosComponent } from './pages/consumos/consumos';
import { ConsumoComponent } from './pages/consumo/consumo';
import { CardapioComponent } from './pages/cardapio/cardapio';
import { TesteFilhoComponent } from './pages/estudos/teste-filho/teste-filho';
import { TestePaiComponent } from './pages/estudos/teste-pai/teste-pai';

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
    {
        path: 'estudos',
        component: TestePaiComponent
    }
];
