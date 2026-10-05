import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-teste-filho',
  styleUrl: './teste-filho.css',
  templateUrl: './teste-filho.html',
})
export class TesteFilhoComponent {

  @Input() nome: string | null = null;

  @Output() nomeChange = new EventEmitter<string>();





}
