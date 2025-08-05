import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../../../shared/entities';
import { AlumnosFetch } from './alumnos-fetch';

@Injectable({ providedIn: 'root' })
export class AlumnosState {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$: Observable<Student[]> = this.studentsSubject.asObservable();

  constructor(private alumnosFetch: AlumnosFetch) {}

  loadStudents() {
    this.alumnosFetch.getAlumnos().subscribe((students) => {
      this.studentsSubject.next(students);
    });
  }

  setStudents(students: Student[]) {
    this.studentsSubject.next(students);
  }

  addStudent(newStudent: Student) {
    const current = this.studentsSubject.getValue();
    this.studentsSubject.next([...current, newStudent]);
  }

  editStudent(edited: Student) {
    const updated = this.studentsSubject
      .getValue()
      .map((s) => (s.dni === edited.dni ? edited : s));
    this.studentsSubject.next(updated);
  }

  deleteStudent(dni: number): boolean {
    const current = this.studentsSubject.getValue();
    const updated = current.filter((s) => s.dni !== dni);

    if (updated.length === current.length) {
      return false;
    }

    this.studentsSubject.next(updated);
    return true;
  }

  getStudents(): Student[] {
    return this.studentsSubject.getValue();
  }
}
