import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { StudentsTable } from "./students-table/students-table";

@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Toolbar, StudentsTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  students: Student[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Student[]>('/mocks/students.json').subscribe((data) => {
      this.students = data;
    });
  }
}