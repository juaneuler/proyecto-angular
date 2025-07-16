import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.scss'
})
export class Hijo {
  @Input() dato: string = '';

  @Output() notificarAlPadre = new EventEmitter<string>();

  avisarAlPadre() {
    console.log("Botón del hijo clickeado!");
    this.notificarAlPadre.emit("Se hizo click en el botón del hijo!")
  }
}