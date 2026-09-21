import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    constructor(private http: HttpClient) { }

    getProdutos() {
        return this.http.get<Produto[]>("http://localhost:8080/produtos");
    }

    postProduto(produto: Produto) {
        return this.http.post("http://localhost:8080/produtos", produto);
    }

}
