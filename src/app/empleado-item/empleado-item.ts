import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado-item.html',
  styleUrl: './empleado-item.scss'
})
export class EmpleadoItem {
  @Input() empleado!: {nombre: string};
  @Input() indice!: number;
  @Output() editarEmpleado = new EventEmitter<{ indice: number, nuevoNombre: string }>;

  nuevoNombre: string = "";

  ngOnInit() {
    this.nuevoNombre = this.empleado.nombre;
  }

  guardar() {
    this.editarEmpleado.emit({ indice: this.indice, nuevoNombre: this.nuevoNombre })
  }
}
