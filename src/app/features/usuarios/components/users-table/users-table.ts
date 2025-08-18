// users-table.ts
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from './../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, CommonModule, Bigtitle],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable {
  @Input() users: User[] = [];
  displayedColumns: string[] = ['nombre', 'rol'];
}