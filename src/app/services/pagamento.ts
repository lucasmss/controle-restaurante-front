import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PagamentoService {
    constructor(private http: HttpClient) { }

    postPagamento(consumoId: number, boolean: false) {
        return this.http.post(`http://localhost:8080/consumos/${consumoId}/pagamento`, false);
    }
}
