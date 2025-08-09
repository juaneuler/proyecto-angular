import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Student, Course, Inscription } from '../../../../../shared/entities';
import { AlumnosState } from '../../../alumnos/alumnos-estado';
import { CursosState } from '../../../cursos/cursos-estado';
import { InscripcionesEstadoService } from '../../inscripciones-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete-inscripcion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    Bigtitle,
    RouterModule
  ],
  templateUrl: './delete-inscripcion.html',
  styleUrl: './delete-inscripcion.scss',
})
export class DeleteInscripcion implements OnInit {
  readonly routes = AppRoutes

  form: FormGroup;
  alumnosInscriptos$: Observable<Student[]>;
  cursosAlumno$: Observable<Course[]>;

  private allCursos$: Observable<Course[]>;
  private inscripciones$: Observable<Inscription[]>;

  constructor(
    private fb: FormBuilder,
    private alumnosState: AlumnosState,
    private cursosState: CursosState,
    private inscripcionesState: InscripcionesEstadoService,
    private snackbar: SnackbarNotification
  ) {
    this.form = this.fb.group({
      alumnoDNI: ['', Validators.required],
      cursoCodigo: ['', Validators.required],
    });

    this.inscripciones$ = this.inscripcionesState.inscripciones$;
    this.allCursos$ = this.cursosState.cursos$;

    this.alumnosInscriptos$ = combineLatest([
      this.alumnosState.students$,
      this.inscripciones$,
    ]).pipe(
      map(([alumnos, inscripciones]) =>
        alumnos.filter((a) =>
          inscripciones.some((i) => i.alumnoDNI === a.dni.toString())
        )
      )
    );

    this.cursosAlumno$ = combineLatest([
      this.form.get('alumnoDNI')!.valueChanges.pipe(startWith('')),
      this.inscripciones$,
      this.allCursos$,
    ]).pipe(
      map(([dni, inscripciones, cursos]) => {
        return cursos.filter((curso) =>
          inscripciones.some(
            (ins) =>
              ins.alumnoDNI === dni?.toString() &&
              ins.cursoCodigo === curso.code
          )
        );
      })
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { alumnoDNI, cursoCodigo } = this.form.value;
      this.inscripcionesState.eliminarInscripcion(
        alumnoDNI.toString(),
        cursoCodigo
      );
      this.snackbar.success('Inscripción eliminada con éxito');
      this.form.reset();
      // Estas dos líneas permiten resetear los selectores y que no marquen error
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }
}
