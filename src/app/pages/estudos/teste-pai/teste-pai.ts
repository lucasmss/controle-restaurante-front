import { Component } from '@angular/core';
import { TesteFilhoComponent } from '../teste-filho/teste-filho';

@Component({
  imports: [TesteFilhoComponent],
  selector: 'app-teste-pai',
  styleUrl: './teste-pai.css',
  templateUrl: './teste-pai.html',
})
export class TestePaiComponent {

  nome: string = 'Lucas Mateus silva';

  recarregarNome() {
    console.log('Recarregando nome...');
  }

}
