import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscription, CambioInscripcion } from '../../../shared/entities';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesEstadoService {
  private inscripcionesSubject = new BehaviorSubject<Inscription[]>([]);
  inscripciones$: Observable<Inscription[]> =
    this.inscripcionesSubject.asObservable();

  constructor() {}

  // Se agregó una función para que el servicio valide si un alumno ya está anotado a un curso, y evitar que haya dos inscripciones de un alumno al mismo curso
  checkIfAlreadyInscribed(dni: string, codigoCurso: string): boolean {
    return this.inscripcionesSubject.value.some(
      (i) => i.alumnoDNI === dni.toString() && i.cursoCodigo === codigoCurso
    );
  }

  // Se agregó una función para que no se pueda modificar una inscrpción eligiendo el curso que ya tiene
  checkIfIsSameCourse(
    nuevoCursoCodigo: string,
    inscripcionActual: Inscription
  ): boolean {
    return nuevoCursoCodigo === inscripcionActual.cursoCodigo;
  }

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
