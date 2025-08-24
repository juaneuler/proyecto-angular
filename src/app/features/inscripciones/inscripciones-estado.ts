import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Inscription, CambioInscripcion } from '../../../shared/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesEstadoService {
  private apiUrl =
    'https://689f921d6e38a02c5816a5d9.mockapi.io/sistema-gestion/inscriptions';
  private inscripcionesSubject = new BehaviorSubject<Inscription[]>([]);
  inscripciones$: Observable<Inscription[]> =
    this.inscripcionesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInscripciones(): Observable<Inscription[]> {
    return this.http
      .get<Inscription[]>(this.apiUrl)
      .pipe(
        tap((inscripciones) => this.inscripcionesSubject.next(inscripciones))
      );
  }

  checkIfAlreadyInscribed(dni: string, codigoCurso: string): boolean {
    return this.inscripcionesSubject.value.some(
      (i) => i.alumnoDNI === dni.toString() && i.cursoCodigo === codigoCurso
    );
  }

  checkIfIsSameCourse(
    nuevoCursoCodigo: string,
    inscripcionActual: Inscription
  ): boolean {
    return nuevoCursoCodigo === inscripcionActual.cursoCodigo;
  }

  inscribirAlumno(dni: string, codigoCurso: string): Observable<Inscription> {
    const nueva: Inscription = {
      alumnoDNI: dni.toString(),
      cursoCodigo: codigoCurso,
    };
    return this.http.post<Inscription>(this.apiUrl, nueva).pipe(
      tap((inscripcionCreada) => {
        this.inscripcionesSubject.next([
          ...this.inscripcionesSubject.value,
          inscripcionCreada,
        ]);
      })
    );
  }

  eliminarInscripcion(dni: string, codigoCurso: string): Observable<void> {
    const inscripcion = this.inscripcionesSubject.value.find(
      (i) => i.alumnoDNI === dni.toString() && i.cursoCodigo === codigoCurso
    );
    if (!inscripcion || !inscripcion.id) {
      throw new Error('No se encontró la inscripción para eliminar');
    }
    const url = `${this.apiUrl}/${inscripcion.id as string}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const filtradas = this.inscripcionesSubject.value.filter(
          (i) => !(i.alumnoDNI === dni && i.cursoCodigo === codigoCurso)
        );
        this.inscripcionesSubject.next(filtradas);
      })
    );
  }

  modificarInscripcion(cambio: CambioInscripcion): Observable<Inscription> {
    const { anterior, nueva } = cambio;
    const inscripcion = this.inscripcionesSubject.value.find(
      (i) =>
        i.alumnoDNI === anterior.alumnoDNI &&
        i.cursoCodigo === anterior.cursoCodigo
    );
    if (!inscripcion || !inscripcion.id) {
      throw new Error('No se encontró la inscripción para modificar');
    }
    const url = `${this.apiUrl}/${inscripcion.id}`;
    return this.http.put<Inscription>(url, nueva).pipe(
      tap((inscripcionActualizada) => {
        const sinAntigua = this.inscripcionesSubject.value.filter(
          (i) =>
            i.alumnoDNI !== anterior.alumnoDNI ||
            i.cursoCodigo !== anterior.cursoCodigo
        );
        this.inscripcionesSubject.next([...sinAntigua, inscripcionActualizada]);
      })
    );
  }
}
