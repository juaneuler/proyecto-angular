import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-delete-form',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, Bigtitle],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss',
})
export class DeleteForm implements OnInit {
  private _snackBar = inject(MatSnackBar);

  @Output() studentDeleted = new EventEmitter<string>();

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      dni: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onDelete() {
    if (this.studentForm.valid) {
      this.showDeletedSuccesfully();
      const { dni } = this.studentForm.value;
      this.studentDeleted.emit(dni);
      this.onReset();
    }
  }

  onReset() {
    this.studentForm.reset();
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showDeletedSuccesfully() {
    const message = 'Estudiante eliminado exitosamente!';
    const action = 'Cerrar';
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
