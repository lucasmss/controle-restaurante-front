import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { Consumo } from '../../../models/consumo.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsumoService } from '../../../services/consumo';
import { PagamentoService } from '../../../services/pagamento';

@Component({
  imports: [CurrencyPipe, DatePipe, FormsModule],
  selector: 'app-fechar-consumo',
  styleUrl: './fechar-consumo.css',
  templateUrl: './fechar-consumo.html',
})
export class FecharConsumoComponent {

  constructor(
    private consumoService: ConsumoService,
    private pagamentoService: PagamentoService) { }

  @Input() consumo: Consumo | null = null;
  @Input() pedidos: Pedido[] = [];
  @Output() fechamentoConfirmado = new EventEmitter<void>();

  taxaServicoAceita: boolean = true;
  pagando = false;


  confirmarFechamento() {
    if (this.consumo) {
      this.pagando = true;

      this.pagamentoService
        .postPagamento(this.consumo.id, this.taxaServicoAceita)
        .subscribe({

          next: () => {

            console.log('Pagamento realizado com sucesso!');

            this.pagando = false;

            // Fecha a modal
            this.fecharModal();

            // Avisa o componente pai que terminou
            this.fechamentoConfirmado.emit();

          },

          error: (erro) => {

            this.pagando = false;

            console.error('Erro ao processar o pagamento:', erro);

          }

        });
    }
  }

  fecharModal() {

    const botaoFechar = document.getElementById(
      'btnFecharModalPagarConta'
    );

    botaoFechar?.click();

  }

}
