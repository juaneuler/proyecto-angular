import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../../shared/entities';
import { ApiRoutes } from '../../../shared/enums/routes';

@Injectable({ providedIn: 'root' })
export class CursosState {
  private cursosSubject = new BehaviorSubject<Course[]>([]);
  cursos$: Observable<Course[]> = this.cursosSubject.asObservable();

  private apiUrl =
    'https://689d0c47ce755fe69787bae6.mockapi.io/sistema-gestion/courses';

  private http = inject(HttpClient);

  constructor() {}

  loadCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      tap((courses) => {
        this.cursosSubject.next(courses);
      })
    );
  }

  addCurso(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, newCourse).pipe(
      tap((createdCourse) => {
        const currentCourses = this.cursosSubject.getValue();
        this.cursosSubject.next([...currentCourses, createdCourse]);
      })
    );
  }

  editCurso(edited: Course): Observable<Course> {
    const courseToUpdate = this.cursosSubject
      .getValue()
      .find((c) => c.customId === edited.customId);

    if (!courseToUpdate) {
      return throwError(
        () => new Error('No se encontró el curso para actualizar.')
      );
    }

    const url = `${this.apiUrl}/${courseToUpdate.id}`;

    return this.http.put<Course>(url, edited).pipe(
      tap((updatedCourseFromServer) => {
        const currentCourses = this.cursosSubject.getValue();
        const updatedList = currentCourses.map((c) =>
          c.customId === updatedCourseFromServer.customId
            ? updatedCourseFromServer
            : c
        );
        this.cursosSubject.next(updatedList);
      })
    );
  }

  deleteCurso(customId: string): Observable<void> {
    const courseToDelete = this.cursosSubject
      .getValue()
      .find((c) => c.customId === customId);

    if (!courseToDelete) {
      return throwError(
        () => new Error('No se encontró el curso para eliminar.')
      );
    }

    const url = `${this.apiUrl}/${courseToDelete.id}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        const currentCourses = this.cursosSubject.getValue();
        const updatedList = currentCourses.filter(
          (c) => c.customId !== customId
        );
        this.cursosSubject.next(updatedList);
      })
    );
  }

  getCourses(): Course[] {
      return this.cursosSubject.getValue();
    }
    
  setCourses(courses: Course[]) {
      this.cursosSubject.next(courses);
    }
}