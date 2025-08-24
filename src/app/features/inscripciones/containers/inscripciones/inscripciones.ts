import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';

import { AppRoutes } from '../../../../../shared/enums/routes';
import { InscriptionsTable } from '../../components/inscriptions-table/inscriptions-table';
import { InscripcionDetalle } from '../../../../../shared/entities';
import { InscripcionesEstadoService } from '../../inscripciones-estado';
import { AlumnosState } from '../../../alumnos/alumnos-estado';
import { CursosState } from '../../../cursos/cursos-estado';
import { AuthService } from '../../../../core/auth/auth-service';

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, RouterLink, RouterOutlet, InscriptionsTable],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.scss',
})
export class Inscripciones implements OnInit {
  AppRoutes = AppRoutes;

  inscripcionesDetalladas$!: Observable<InscripcionDetalle[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private inscripcionesEstado: InscripcionesEstadoService,
    private alumnosState: AlumnosState,
    private cursosState: CursosState,
    public authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(): void {
    this.alumnosState.loadStudents().subscribe();
    this.cursosState.loadCursos().subscribe();
    this.inscripcionesEstado.loadInscripciones().subscribe();

    this.inscripcionesDetalladas$ = combineLatest([
      this.inscripcionesEstado.inscripciones$,
      this.alumnosState.students$,
      this.cursosState.cursos$,
    ]).pipe(
      map(([inscripciones, alumnos, cursos]) => {
        return inscripciones.map((insc) => {
          const alumno = alumnos.find(
            (a) => a.dni.toString() === insc.alumnoDNI
          );
          const curso = cursos.find((c) => c.code === insc.cursoCodigo);

          return {
            alumnoDNI: alumno?.dni ?? 0,
            alumnoNombre: alumno?.name ?? 'N/D',
            alumnoApellido: alumno?.surname ?? 'N/D',
            cursoCodigo: curso?.code ?? 'N/D',
            cursoNombre: curso?.name ?? 'N/D',
          };
        });
      })
    );
  }
}
