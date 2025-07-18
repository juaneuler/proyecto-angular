import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, Bigtitle],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm implements OnInit {
  private _snackBar = inject(MatSnackBar);

  studentForm!: FormGroup;

  @Output() studentAdded = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  loading = false;

  onSubmit() {
    if (this.studentForm.invalid) return;

    this.loading = true;

    setTimeout(() => {
      this.studentAdded.emit(this.studentForm.value as Student);
      this.showAddedSuccesfully();
      this.onReset();
      this.loading = false;
    }, 1000);
  }

  onReset() {
    this.studentForm.reset();
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showAddedSuccesfully() {
    const message = 'Estudiante agregado exitosamente!';
    const action = 'Cerrar';
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
