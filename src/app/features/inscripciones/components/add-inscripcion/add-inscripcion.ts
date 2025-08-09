import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AlumnosState } from '../../../alumnos/alumnos-estado';
import { CursosState } from '../../../cursos/cursos-estado';
import { InscripcionesEstadoService } from '../../inscripciones-estado';
import { Observable } from 'rxjs';
import { Student, Course } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';

// Definimos la función para validar por fuera del componente
const alreadyInscribedValidator = (
  inscripcionesEstadoService: InscripcionesEstadoService
): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const alumnoDNI = form.get('alumnoDNI')?.value;
    const cursoCodigo = form.get('cursoCodigo')?.value;

    if (!alumnoDNI || !cursoCodigo) {
      return null;
    }

    const isAlreadyInscribed =
      inscripcionesEstadoService.checkIfAlreadyInscribed(
        alumnoDNI,
        cursoCodigo
      );

    return isAlreadyInscribed ? { alreadyInscribed: true } : null;
  };
};
@Component({
  selector: 'app-add-inscripcion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    Bigtitle,
  ],
  templateUrl: './add-inscripcion.html',
  styleUrl: './add-inscripcion.scss',
})
export class AddInscripcion implements OnInit {
  form: FormGroup;
  alumnos$: Observable<Student[]>;
  cursos$: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private alumnosState: AlumnosState,
    private cursosState: CursosState,
    private inscripcionesState: InscripcionesEstadoService,
    private snackbarNotification: SnackbarNotification
  ) {
    this.form = this.fb.group(
      {
        alumnoDNI: ['', Validators.required],
        cursoCodigo: ['', Validators.required],
      },
      // Aplicamos el validador a nivel de FormGroup
      { validators: alreadyInscribedValidator(this.inscripcionesState) }
    );
    this.alumnos$ = this.alumnosState.students$;
    this.cursos$ = this.cursosState.cursos$;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { alumnoDNI, cursoCodigo } = this.form.value;
      this.inscripcionesState.inscribirAlumno(alumnoDNI, cursoCodigo);
      this.form.reset();
      this.snackbarNotification.success('Alumno inscripto con éxito!');
      // Estas líneas son para evitar que los selectores marquen error al enviar una inscripcion
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }
}
