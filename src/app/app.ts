import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { StudentsTable } from "./students-table/students-table";
import { AddForm } from "./add-form/add-form";
import { DeleteForm } from './delete-form/delete-form';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Toolbar, StudentsTable, AddForm, DeleteForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  students: Student[] = [];
  activeSection = "students"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Student[]>('/mocks/students.json').subscribe((data) => {
      this.students = data;
    });
  }

  addStudent(student: Student) {
    this.students = [...this.students, student]
  }

  deleteStudent(dni: string) {
    const studentsList = this.students = this.students.filter(student => student.dni.toString() !== dni);
    this.students = [...studentsList];
  }
}