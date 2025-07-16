import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuario } from './perfil-usuario/perfil-usuario';
import { Home } from './home/home';
import { Hijo } from './hijo/hijo';
import { FormsModule } from '@angular/forms';
import { EmpleadoItem } from "./empleado-item/empleado-item";
import { Formulario } from './formulario/formulario';
@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, Home, PerfilUsuario, Hijo, EmpleadoItem, Formulario],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular-EULER-Juan';

  // Array para practicar el uso de ngFor
  listaDeNombres = ['Juan', 'Ross', 'Rocky'];

  // Booleano para practicar el uso de ngClass
  active = true;

  // Variable para practicar el uso de pipes
  texto = 'Este texto va a pasar a mayúsculas con el pipe de Uppercase';

  // Prueba de @Input
  mensaje = 'Hola! Este saludo viene del componente padre!';

  // Prueba del @Output
  respuesta: string | null = null;

  respuestaDelPadre(mensaje: string) {
    console.log('Evento recibido desde el hijo:', mensaje);

    this.respuesta = mensaje;
  }

  // Actividad para mostrar una lista de empleados
  empleados = [
    { nombre: 'Juan' },
    { nombre: 'Ross' },
    { nombre: 'Rocky' },
    { nombre: 'Riker' },
    { nombre: 'Ellington' },
  ];

  nuevoEmpleado = '';

  agregarEmpleado() {
    if (this.nuevoEmpleado.trim()) {
      this.empleados.push({ nombre: this.nuevoEmpleado });
      this.nuevoEmpleado = '';
    }
  }

  actualizarEmpleados(index: number, nuevoNombre: string) {
    this.empleados[index].nombre = nuevoNombre;
  }
}
