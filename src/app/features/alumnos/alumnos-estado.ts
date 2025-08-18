import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student, StudentToAdd } from '../../../shared/entities';

@Injectable({ providedIn: 'root' })
export class AlumnosState {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$: Observable<Student[]> = this.studentsSubject.asObservable();

  private apiUrl = 'https://689d0c47ce755fe69787bae6.mockapi.io/sistema-gestion/students';

  constructor(private http: HttpClient) {}

  loadStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((students) => {
        this.studentsSubject.next(students);
      })
    );
  }

  addStudent(newStudent: StudentToAdd): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, newStudent).pipe(
      tap((createdStudent) => {
        const currentStudents = this.studentsSubject.getValue();
        this.studentsSubject.next([...currentStudents, createdStudent]);
      })
    );
  }

  editStudent(editedStudent: Student): Observable<Student> {
    const studentToUpdate = this.studentsSubject
      .getValue()
      .find(s => s.customId === editedStudent.customId);

    if (!studentToUpdate) {
      return throwError(() => new Error('No se encontró el estudiante para actualizar.'));
    }

    const url = `${this.apiUrl}/${studentToUpdate.id}`;

    return this.http.put<Student>(url, editedStudent).pipe(
      tap((updatedStudentFromServer) => {
        const currentStudents = this.studentsSubject.getValue();
        const updatedList = currentStudents.map((s) =>
          s.customId === updatedStudentFromServer.customId ? updatedStudentFromServer : s
        );
        this.studentsSubject.next(updatedList);
      })
    );
  }

  deleteStudent(customId: string): Observable<void> {
    const studentToDelete = this.studentsSubject
      .getValue()
      .find(s => s.customId === customId);

    if (!studentToDelete) {
        return throwError(() => new Error('No se encontró el estudiante para eliminar.'));
    }

    const url = `${this.apiUrl}/${studentToDelete.id}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        const currentStudents = this.studentsSubject.getValue();
        const updatedList = currentStudents.filter((s) => s.customId !== customId);
        this.studentsSubject.next(updatedList);
      })
    );
  }

  getStudents(): Student[] {
    return this.studentsSubject.getValue();
  }
  
  setStudents(students: Student[]) {
    this.studentsSubject.next(students);
  }
}