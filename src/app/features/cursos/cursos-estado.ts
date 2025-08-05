import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../../shared/entities';
import { CursosFetch } from './cursos-fetch';

@Injectable({ providedIn: 'root' })
export class CursosState {
  private cursosSubject = new BehaviorSubject<Course[]>([]);
  cursos$: Observable<Course[]> = this.cursosSubject.asObservable();

  constructor(private cursosFetch: CursosFetch) {}

  loadCursos() {
    this.cursosFetch.getCursos().subscribe((cursos) => {
      this.cursosSubject.next(cursos);
    });
  }

  setCursos(cursos: Course[]) {
    this.cursosSubject.next(cursos);
  }

  addCurso(nuevo: Course) {
    const current = this.cursosSubject.getValue();
    this.cursosSubject.next([...current, nuevo]);
  }

  editCurso(editado: Course) {
    const updated = this.cursosSubject
      .getValue()
      .map((c) => (c.id === editado.id ? editado : c));
    this.cursosSubject.next(updated);
  }

  deleteCurso(code: string): boolean {
    const current = this.cursosSubject.getValue();
    const updated = current.filter((c) => c.code !== code);

    if (updated.length === current.length) {
      return false;
    }

    this.cursosSubject.next(updated);
    return true;
  }

  getCursos(): Course[] {
    return this.cursosSubject.getValue();
  }
}
