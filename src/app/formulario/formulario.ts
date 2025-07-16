import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      ocupacion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  datosGuardados: any = null;

  enviar() {
    if (this.formulario.valid) {
      this.datosGuardados = this.formulario.value;
      console.log('Datos enviados:', this.datosGuardados);
    }
  }
}
