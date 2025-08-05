import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../../../../shared/entities';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss'
})
export class CoursesTable {
  @Input() courses: Course[] = [];
  displayedColumns: string[] = ['name', 'code', 'credits'];
}
