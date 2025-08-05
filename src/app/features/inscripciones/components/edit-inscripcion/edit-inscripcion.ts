import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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

@Component({
  selector: 'app-edit-inscripcion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    Bigtitle
  ],
  templateUrl: './edit-inscripcion.html',
  styleUrl: './edit-inscripcion.scss',
})
export class EditInscripcion implements OnInit {
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
        console.log('Alumnos:', alumnos);
        console.log('Inscripciones:', inscripciones);
        const filtrados = alumnos.filter((alumno) =>
          inscripciones.some((ins) => Number(ins.alumnoDNI) === alumno.dni)
        );
        console.log('Alumnos inscriptos filtrados:', filtrados);
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
              console.log('Buscando inscripción para DNI:', dni);
              console.log('Inscripciones:', inscripciones);
              return (
                inscripciones.find((i) => i.alumnoDNI === dni.toString()) ||
                null
              );
            }),
            tap((actual) => {
              this.inscripcionActual = actual;
              if (actual) {
                if (
                  this.form.get('nuevoCursoCodigo')?.value !==
                  actual.cursoCodigo
                ) {
                  this.form.patchValue(
                    { nuevoCursoCodigo: actual.cursoCodigo },
                    { emitEvent: false }
                  );
                }
              } else {
                this.form.patchValue(
                  { nuevoCursoCodigo: '' },
                  { emitEvent: false }
                );
              }
            })
          )
        )
      )
      .subscribe();
  }

  onSubmit(): void {
    console.log('Submit edit:', this.form.value, this.inscripcionActual);
    if (this.form.valid && this.inscripcionActual) {
      const nuevoCursoCodigo = this.form.value.nuevoCursoCodigo;
      const { alumnoDNI, cursoCodigo } = this.inscripcionActual;

      if (cursoCodigo === nuevoCursoCodigo) {
        this.snackbarNotification.error('El curso seleccionado es el mismo.');
        return;
      }

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
      this.inscripcionActual = null;
    }
  }
}