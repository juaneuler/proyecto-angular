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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, combineLatest } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {
  Student,
  Course,
  Inscription,
  CambioInscripcion,
} from '../../../../../shared/entities';
import { AlumnosState } from '../../../alumnos/alumnos-estado';
import { CursosState } from '../../../cursos/cursos-estado';
import { InscripcionesEstadoService } from '../../inscripciones-estado';
import { SnackbarNotification } from '../../../../../shared/services/snackbar-notification';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { RouterModule } from '@angular/router';

// Esta es la función para validar
const sameCourseValidator = (
  inscripcionesEstadoService: InscripcionesEstadoService,
  inscripcionActual: Inscription | null
): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const nuevoCursoCodigo = form.get('nuevoCursoCodigo')?.value;

    // Si no hay inscripción actual o no hay curso nuevo, no validamos
    if (!inscripcionActual || !nuevoCursoCodigo) {
      return null;
    }

    // Usamos el método del servicio para ejecutar la lógica de negocio
    const isSameCourse = inscripcionesEstadoService.checkIfIsSameCourse(
      nuevoCursoCodigo,
      inscripcionActual
    );

    // Devolvemos el error si fuera necesario
    return isSameCourse ? { sameCourse: true } : null;
  };
};

@Component({
  selector: 'app-edit-inscripcion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    Bigtitle,
    RouterModule,
  ],
  templateUrl: './edit-inscripcion.html',
  styleUrl: './edit-inscripcion.scss',
})
export class EditInscripcion implements OnInit {
  readonly routes = AppRoutes;

  form: FormGroup;
  alumnos$: Observable<Student[]>;
  cursos$: Observable<Course[]>;
  inscripciones$: Observable<Inscription[]>;

  inscripcionActual: Inscription | null = null;

  constructor(
    private fb: FormBuilder,
    private alumnosState: AlumnosState,
    private cursosState: CursosState,
    private inscripcionesState: InscripcionesEstadoService,
    private snackbarNotification: SnackbarNotification
  ) {
    this.form = this.fb.group({
      alumnoDNI: ['', Validators.required],
      nuevoCursoCodigo: ['', Validators.required],
    });

    this.alumnos$ = combineLatest([
      this.alumnosState.students$,
      this.inscripcionesState.inscripciones$,
    ]).pipe(
      map(([alumnos, inscripciones]) => {
        const filtrados = alumnos.filter((alumno) =>
          inscripciones.some((ins) => Number(ins.alumnoDNI) === alumno.dni)
        );
        return filtrados;
      })
    );

    this.cursos$ = this.cursosState.cursos$;
    this.inscripciones$ = this.inscripcionesState.inscripciones$;
  }

  ngOnInit(): void {
    this.form
      .get('alumnoDNI')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        switchMap((dni) =>
          this.inscripciones$.pipe(
            map((inscripciones) => {
              if (!dni) return null;
              return (
                inscripciones.find((i) => i.alumnoDNI === dni.toString()) ||
                null
              );
            }),
            tap((actual) => {
              this.inscripcionActual = actual;
              if (actual) {
                // Aplicamos el validador, pasándole la inscripción actual y el servicio
                this.form.setValidators(
                  sameCourseValidator(
                    this.inscripcionesState,
                    this.inscripcionActual
                  )
                );
                this.form.patchValue(
                  { nuevoCursoCodigo: actual.cursoCodigo },
                  { emitEvent: false }
                );
              } else {
                this.form.clearValidators();
                this.form.patchValue(
                  { nuevoCursoCodigo: '' },
                  { emitEvent: false }
                );
              }
              this.form.updateValueAndValidity();
            })
          )
        )
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.form.valid && this.inscripcionActual) {
      const nuevoCursoCodigo = this.form.value.nuevoCursoCodigo;
      const { alumnoDNI, cursoCodigo } = this.inscripcionActual;

      const cambio: CambioInscripcion = {
        anterior: { alumnoDNI: alumnoDNI.toString(), cursoCodigo },
        nueva: {
          alumnoDNI: alumnoDNI.toString(),
          cursoCodigo: nuevoCursoCodigo,
        },
      };

      this.inscripcionesState.modificarInscripcion(cambio);
      this.snackbarNotification.success('Inscripción modificada correctamente');
      this.form.reset();
      // Añadimos estas líneas para una limpieza completa
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.inscripcionActual = null;
    }
  }
}
