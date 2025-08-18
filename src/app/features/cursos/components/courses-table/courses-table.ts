import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule, CommonModule, Bigtitle],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss'
})
export class CoursesTable {
  @Input() courses: Course[] = [];
  displayedColumns: string[] = ['name', 'code', 'credits'];
}
