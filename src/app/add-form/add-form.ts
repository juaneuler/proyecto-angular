import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { SnackbarNotification } from '../../shared/services/snackbar-notification';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, Bigtitle],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm implements OnInit {
  private snackbarNotification = inject(SnackbarNotification);

  studentForm!: FormGroup;

  @Output() studentAdded = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      dni: ['', [
    Validators.required,
    Validators.pattern(/^[1-9]\d{6,7}$/) // Esto lo agrego para que en DNI ingresado tenga si o si entre 7 y 8 dígitos, y que no empiece con 0
    ]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      average: ['', [Validators.required, Validators.min(0.1), Validators.max(10)]],
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

  showAddedSuccesfully() {
    this.snackbarNotification.success('Estudiante agregado exitosamente!');
  }
}