import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../../shared/entities';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiRoutes } from '../../../shared/enums/routes';

@Injectable({
  providedIn: 'root',
})
export class AlumnosFetch {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${this.baseUrl}/${ApiRoutes.Students}`)
      .pipe(delay(1000));
  }

  deleteAlumno(student: Student): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${ApiRoutes.Students}/${student.dni}`)
      .pipe(delay(1000));
  }
}
