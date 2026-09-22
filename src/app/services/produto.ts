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

    putProduto(produtoId: number, produto: Produto) {
        return this.http.put<Produto>(`http://localhost:8080/produtos/${produtoId}`, produto);
    }

    postProduto(produto: Produto) {
        return this.http.post<Produto>("http://localhost:8080/produtos", produto);
    }

    deleteProduto(produtoId: number) {
        return this.http.delete(`http://localhost:8080/produtos/${produtoId}`);
    }


}
