import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from '../models/mesa.model';

@Injectable({
    providedIn: 'root'
})
export class ConsumoService {

    constructor(private http: HttpClient) {}

    getMesas() {
        return this.http.get<Mesa[]>("http://localhost:8080/mesas/disponiveis");
    }

    postConsumo(mesaId: number) {
        return this.http.post(`http://localhost:8080/mesas/${mesaId}/consumos`, {});
    }
}
