import { Component } from '@angular/core';
import { Persona } from '../Persona';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.scss'
})
export class Student {
// Importamos la interfaz, y genereamos una persona para renderizar con el uso de ngIf
  Persona: Persona | null = {
    nombre: 'Juan',
    apellido: 'Euler',
    edad: 26,
    direccion: 'Pilar, Zona Norte, Provincia de Buenos Aires',
  };
}
