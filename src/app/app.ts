import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { StudentsTable } from "./students-table/students-table";
import { AddForm } from "./add-form/add-form";
import { DeleteForm } from './delete-form/delete-form';
import { EditForm } from "./edit-form/edit-form";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Toolbar, StudentsTable, AddForm, DeleteForm, EditForm, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  students: Student[] = [];
  activeSection = "students"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.http.get<Student[]>('/mocks/students.json').subscribe((data) => {
      this.students = data;
    });
  }

  addStudent(student: Student) {
    this.students = [...this.students, {...student, dni: Number(student.dni)}]
  }

  deleteStudent(dni: string) {
  const index = this.students.findIndex(student => student.dni === Number(dni));

  if (index !== -1) {
    this.students.splice(index, 1);
    this.students = [...this.students];
    this.snackBar.open('Estudiante eliminado exitosamente!', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  } else {
    this.snackBar.open('No se encontró ningún estudiante con ese DNI.', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

  editStudent(editedStudent: Student) {
  this.students = this.students.map(student =>
    student.dni === Number(editedStudent.dni)
      ? { ...editedStudent, dni: Number(editedStudent.dni) }
      : student
  );
}
}