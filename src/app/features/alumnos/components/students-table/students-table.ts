import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { FullnamePipe } from './../../../../../shared/pipes/fullname-pipe';
import { Student } from './../../../../../shared/entities';


@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTable {
  @Input() students: Student[] = [];
  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average'];
}
