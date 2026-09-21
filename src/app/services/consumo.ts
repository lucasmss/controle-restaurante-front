import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from '../models/mesa.model';
import { Consumo } from '../models/consumo.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
    providedIn: 'root'
})
export class ConsumoService {

    constructor(private http: HttpClient) { }

    getMesas() {
        return this.http.get<Mesa[]>("http://localhost:8080/mesas");
    }

    getConsumosAbertos() {
        return this.http.get<Consumo[]>("http://localhost:8080/mesas/consumos");
    }

    getConsumoById(consumoId: number) {
        return this.http.get<Consumo>(`http://localhost:8080/mesas/${consumoId}/consumos`);
    }

    getMesasDisponiveis() {
        return this.http.get<Mesa[]>("http://localhost:8080/mesas/disponiveis");
    }

    getItensPedidos(consumoId: number) {
        return this.http.get<Pedido[]>(`http://localhost:8080/mesas/${consumoId}/pedidos`);
    }

    postConsumo(mesaId: number) {
        return this.http.post(`http://localhost:8080/mesas/${mesaId}/consumos`, {});
    }

    postPedido(consumoId: number, pedido: any) {
        return this.http.post(`http://localhost:8080/consumos/${consumoId}/pedidos`, pedido);
    }

    deletePedido(pedidoId: number) {
        return this.http.delete(`http://localhost:8080/pedidos/${pedidoId}`);
    }
}
