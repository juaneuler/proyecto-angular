import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from '../../../shared/entities';
import { ApiRoutes } from '../../../shared/enums/routes';

@Injectable({
  providedIn: 'root',
})
export class CursosFetch {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${this.baseUrl}/${ApiRoutes.Courses}`)
      .pipe(delay(1000));
  }

  deleteCurso(course: Course): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${ApiRoutes.Courses}/${course.id}`)
      .pipe(delay(1000));
  }

  addCurso(course: Course): Observable<Course> {
    return this.http
      .post<Course>(`${this.baseUrl}/${ApiRoutes.Courses}`, course)
      .pipe(delay(1000));
  }

  editCurso(course: Course): Observable<Course> {
    return this.http
      .put<Course>(`${this.baseUrl}/${ApiRoutes.Courses}/${course.id}`, course)
      .pipe(delay(1000));
  }
}
