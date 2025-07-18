import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../shared/entities';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-edit-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, Bigtitle],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss'
})

export class EditForm implements OnInit {
  private _snackBar = inject(MatSnackBar);
  @Output() studentEdited = new EventEmitter<Student>();

  searchForm!: FormGroup;
  editForm!: FormGroup;
  selectedStudent: Student | null = null;

  @Input() students: Student[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      dni: new FormControl('', Validators.required),
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSearch() {
    const dni = Number(this.searchForm.value.dni);
    const student = this.students.find((student) => student.dni === dni);

    if (student) {
      this.selectedStudent = student;
      this.editForm.patchValue({
        name: student.name,
        surname: student.surname,
        age: student.age,
      });
    } else {
      this._snackBar.open('Estudiante no encontrado.', 'Cerrar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.selectedStudent = null;
    }
  }

  onEdit() {
    if (this.editForm.valid && this.selectedStudent) {
      const editedStudent: Student = {
        ...this.selectedStudent,
        ...this.editForm.value,
      };

      this.studentEdited.emit(editedStudent);
      this._snackBar.open('Estudiante editado con éxito!', 'Cerrar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.onReset();
    }
  }

  onReset() {
    this.searchForm.reset();
    this.editForm.reset();
    this.selectedStudent = null;
  }
}