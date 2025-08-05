import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Inscription,
  CambioInscripcion,
  Student,
} from '../../../shared/entities';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesEstadoService {
  private inscripcionesSubject = new BehaviorSubject<Inscription[]>([]);
  inscripciones$: Observable<Inscription[]> =
    this.inscripcionesSubject.asObservable();

  constructor() {}

  inscribirAlumno(dni: string, codigoCurso: string): void {
    const actuales = this.inscripcionesSubject.value;
    const nueva: Inscription = {
      alumnoDNI: dni.toString(),
      cursoCodigo: codigoCurso,
    };
    this.inscripcionesSubject.next([...actuales, nueva]);
  }

  eliminarInscripcion(dni: string, codigoCurso: string): void {
    const filtradas = this.inscripcionesSubject.value.filter(
      (i) => !(i.alumnoDNI === dni && i.cursoCodigo === codigoCurso)
    );
    this.inscripcionesSubject.next(filtradas);
  }

  modificarInscripcion(cambio: CambioInscripcion): void {
    const { anterior, nueva } = cambio;

    const sinAntigua = this.inscripcionesSubject.value.filter(
      (i) =>
        i.alumnoDNI !== anterior.alumnoDNI ||
        i.cursoCodigo !== anterior.cursoCodigo
    );

    this.inscripcionesSubject.next([...sinAntigua, nueva]);
    console.log('Inscripciones actualizadas:', this.inscripcionesSubject.value);
  }
}
