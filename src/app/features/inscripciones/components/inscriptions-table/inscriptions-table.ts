import { Component, Input } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { InscripcionDetalle } from '../../../../../shared/entities';
import { CommonModule } from '@angular/common';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';

@Component({
  selector: 'app-inscriptions-table',
  imports: [MatTableModule, CommonModule, Bigtitle],
  templateUrl: './inscriptions-table.html',
  styleUrls: ['./inscriptions-table.scss'],
})
export class InscriptionsTable {
  @Input()
  set inscriptions(value: InscripcionDetalle[] | null) {
    if (value) {
      this.dataSource.data = value;
    }
  }

  dataSource = new MatTableDataSource<InscripcionDetalle>();

  displayedColumns: string[] = [
    'alumnoDNI',
    'alumnoNombre',
    'alumnoApellido',
    'cursoCodigo',
    'cursoNombre',
  ];

  constructor() {}
}